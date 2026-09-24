import AVFoundation
import CoreImage
import Foundation

// venc <in> <out> --w N --kbps N [--trim start,dur] [--blur x,y,w,h]...
// Explicit bitrate control; AVAssetExportSession presets do not expose it.
// Audio is dropped on purpose: these are CCTV clips and any incidental speech
// on a customer's floor is not ours to publish.

var args = Array(CommandLine.arguments.dropFirst())
let inPath = args.removeFirst(), outPath = args.removeFirst()
var trim: (Double, Double)? = nil
var blurs: [CGRect] = []
var outW: CGFloat = 1280
var kbps = 1800

while !args.isEmpty {
    let f = args.removeFirst()
    switch f {
    case "--trim": let p = args.removeFirst().split(separator: ",").map { Double($0)! }; trim = (p[0], p[1])
    case "--blur": let p = args.removeFirst().split(separator: ",").map { Double($0)! }
                   blurs.append(CGRect(x: p[0], y: p[1], width: p[2], height: p[3]))
    case "--w": outW = CGFloat(Double(args.removeFirst())!)
    case "--kbps": kbps = Int(args.removeFirst())!
    default: break
    }
}

let asset = AVURLAsset(url: URL(fileURLWithPath: inPath))
let sem = DispatchSemaphore(value: 0)
var failure: String? = nil
let ciContext = CIContext()

Task {
    do {
        let track = try await asset.loadTracks(withMediaType: .video).first!
        let natural = try await track.load(.naturalSize)
        let scale = outW / natural.width
        let outH = (natural.height * scale).rounded(.down)
        let outSize = CGSize(width: outW, height: outH - outH.truncatingRemainder(dividingBy: 2))

        let reader = try AVAssetReader(asset: asset)
        if let (s, d) = trim {
            reader.timeRange = CMTimeRange(start: CMTime(seconds: s, preferredTimescale: 600),
                                           duration: CMTime(seconds: d, preferredTimescale: 600))
        }
        let readerOut = AVAssetReaderTrackOutput(track: track, outputSettings: [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
        reader.add(readerOut)

        try? FileManager.default.removeItem(atPath: outPath)
        let writer = try AVAssetWriter(outputURL: URL(fileURLWithPath: outPath), fileType: .mp4)
        // moov first, so playback can start before the file finishes arriving.
        writer.shouldOptimizeForNetworkUse = true
        let writerIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: Int(outSize.width),
            AVVideoHeightKey: Int(outSize.height),
            AVVideoCompressionPropertiesKey: [
                AVVideoAverageBitRateKey: kbps * 1000,
                AVVideoMaxKeyFrameIntervalKey: 60,
                AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
            ],
        ])
        writerIn.expectsMediaDataInRealTime = false
        let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: writerIn, sourcePixelBufferAttributes: [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
            kCVPixelBufferWidthKey as String: Int(outSize.width),
            kCVPixelBufferHeightKey as String: Int(outSize.height)])
        writer.add(writerIn)

        // CIImage origin is bottom-left; the rects supplied are top-left.
        let flipped = blurs.map { CGRect(x: $0.minX, y: natural.height - $0.minY - $0.height,
                                         width: $0.width, height: $0.height) }

        writer.startWriting(); writer.startSession(atSourceTime: .zero); reader.startReading()
        let queue = DispatchQueue(label: "enc")
        var frames = 0
        var first: CMTime? = nil

        writerIn.requestMediaDataWhenReady(on: queue) {
            while writerIn.isReadyForMoreMediaData {
                guard let sample = readerOut.copyNextSampleBuffer(),
                      let pb = CMSampleBufferGetImageBuffer(sample) else {
                    writerIn.markAsFinished()
                    writer.finishWriting { sem.signal() }
                    return
                }
                let pts = CMSampleBufferGetPresentationTimeStamp(sample)
                if first == nil { first = pts }
                let rel = CMTimeSubtract(pts, first!)

                var image = CIImage(cvPixelBuffer: pb)
                for rect in flipped {
                    let blurred = image.clampedToExtent().applyingGaussianBlur(sigma: 25).cropped(to: rect)
                    image = blurred.composited(over: image)
                }
                image = image.transformed(by: CGAffineTransform(scaleX: scale, y: scale))

                var outPB: CVPixelBuffer?
                CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &outPB)
                if let outPB {
                    ciContext.render(image, to: outPB)
                    adaptor.append(outPB, withPresentationTime: rel)
                    frames += 1
                }
            }
        }
        sem.wait()
        if writer.status != .completed { failure = writer.error?.localizedDescription ?? "writer failed" }
        print("frames: \(frames)")
    } catch { failure = "\(error)" }
    sem.signal()
}
sem.wait()
if let f = failure { FileHandle.standardError.write("FAILED: \(f)\n".data(using: .utf8)!); exit(1) }
let bytes = (try! FileManager.default.attributesOfItem(atPath: outPath)[.size] as! NSNumber).intValue
print("wrote \(outPath) — \(bytes / 1024) KB")
