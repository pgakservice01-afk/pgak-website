---
title: "CCTV resolution vs distance: calculate and test useful detail"
date: "2026-09-09"
updated: "2026-10-29"
category: "Camera Setup"
excerpt: "Calculate pixels per metre from image width and field of view. Understand why megapixels and DORI benchmarks do not guarantee AI recognition."
metaTitle: "CCTV resolution vs distance: calculate and test useful detail"
metaDescription: "Calculate pixels per metre from image width and field of view. Understand why megapixels and DORI benchmarks do not guarantee AI recognition."
readTime: 4
image: "/insights/category/camera-setup-2.webp"
---

A camera can show the whole yard clearly while leaving too little detail at the gate. Before buying more megapixels, identify the exact point where a person, vehicle or object must be visible and what the recording needs to show.

Resolution matters, but so do the lens, framing, distance, lighting and recorded stream. A useful calculation estimates the detail available at the target. A site test then checks whether that detail meets the actual requirement.

## Use horizontal pixels and scene width

Pixel density in pixels per metre is the image's horizontal pixel count divided by the scene width, in metres, at the target position.

For example, a 1,920-pixel-wide image showing a 12-metre-wide area gives 160 pixels per metre. If the same image covers 24 metres at the target, the density falls to 80 pixels per metre. These are illustrative calculations, not camera performance results.

Use the resolution of the stream you will actually record or process. A camera's maximum advertised resolution may differ from the configured stream. Enlarging a low-resolution picture on a screen does not add captured detail.

## A worked distance example

For a simplified level scene, an 80-degree horizontal field of view gives a width of approximately twice the distance multiplied by the tangent of 40 degrees. Assume an image width of 2,688 pixels throughout:

| Distance to target plane | Approximate scene width | Approximate pixel density |
| --- | --- | --- |
| 5 metres | 8.4 metres | 320 pixels/metre |
| 10 metres | 16.8 metres | 160 pixels/metre |
| 20 metres | 33.6 metres | 80 pixels/metre |
| 40 metres | 67.1 metres | 40 pixels/metre |

This table describes geometry, not a promise of identifying a face at any listed distance. Camera tilt, perspective and the actual lens specification require a more careful design. Measure the view or use the manufacturer's planning tools before specifying equipment.

## Treat DORI as planning guidance

Axis's [explanation of the IEC 62676-4:2014 pixel-density model](https://whitepapers.axis.com/en-us/pixel-density-based-on-iec-62676-4-2014) lists approximate planning values of 25 pixels/metre for detection, 63 for observation, 125 for recognition and 250 for identification.

The same document makes an important distinction: those definitions concern images interpreted by human operators. Automated video analytics has its own requirements. Lighting, optics and compression also affect results, so a density threshold is not a guarantee.

Do not label an 80-pixels/metre example as meeting the cited 125-pixels/metre recognition benchmark. Nor does 160 meet the cited 250 identification benchmark. Even a higher calculated figure still needs the relevant real-world test.

## More megapixels do not translate directly into more range

Use actual horizontal dimensions when comparing cameras. If total pixel count doubles while the aspect ratio stays the same, horizontal pixels increase by about 1.41 times, not twice. A different aspect ratio changes that relationship.

A narrower field of view can place more pixels on the target, but reduces the width covered. Check whether the camera supports the proposed lens or optical adjustment; not every fixed-lens camera can simply be fitted with another lens. Digital cropping does not create new captured detail.

Record what an adjustment leaves outside the view. A separate overview or detail view may be appropriate, but the requirement should decide that rather than a blanket two-camera rule.

## Test the recorded result at the required spot

Agree the task, target position and operating conditions. Review the recorded export, including representative movement and required night lighting. Avoid accepting a stationary, close-up daytime sample for a moving target at a distant gate.

For analytics, record the tested model, firmware, stream settings, processing configuration and event definition. Use the [compatibility checklist](/platform/compatibility) and [pilot worksheet](/resources/evaluation-method). A good human-readable view does not by itself approve an automated recognition application.

Preparing a camera upgrade? Bring the intended target distance, approximate scene width and the task you need the image to support. AI Alerto by PGAK can begin with a view-specific feasibility discussion before any equipment recommendation.

[Ask for a free feasibility check](#dealer)
