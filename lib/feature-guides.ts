export const FEATURE_GUIDES: Record<string, { keyword: string; intro: string; advice: string; question: string; answer: string }> = {
'natural-language-search': {
keyword:'Natural language video search',
intro:'You know what you are looking for, but not when it happened. Natural language video search lets you describe a person, vehicle or object and review matching recordings. A warehouse manager might search for a white van near the gate instead of opening every camera and guessing the time.',
advice:'Start with simple descriptions from your own footage. Try clothing colour, vehicle type and location separately before combining them. Keep the original clips available so an operator can check each result; a convincing match can still be the wrong person or vehicle.',
question:'Can I search all my old CCTV recordings?', answer:'Only if the proposed platform can ingest and index those recordings. Ask which cameras, recording formats, retention periods and historical imports are supported before assuming your archive is searchable.'},
'cross-camera-search': {
keyword:'Cross camera person and vehicle search',
intro:'An incident rarely stays in one camera view. Cross-camera search helps you find appearances of a selected person or vehicle across a connected site. It can give your team a starting point for reviewing the entrance, corridor and loading bay without manually searching each recording from scratch.',
advice:'Test with similar-looking uniforms and vehicles, not just an easy demonstration. Gaps in coverage, changing light and obstructed views can break the trail. Treat the suggested matches as leads for review rather than a confirmed identity or a complete journey.',
question:'Is cross-camera search the same as face recognition?',answer:'No. A system may match appearance, clothing or vehicle characteristics without recognising a face. Confirm what the chosen product actually compares and what evidence an operator can inspect.'},
'event-summaries': {
keyword:'AI video event summaries',
intro:'Opening every overnight clip takes time. AI video event summaries turn supported detections into short written descriptions, helping an operator choose what to watch first. A summary might describe someone entering an office lobby, but the recording remains the evidence.',
advice:'Check whether the tool analyses the whole clip or selected frames. Test events with more than one person and activity in the background. A useful summary should link back to its footage and make it easy to correct a misleading description.',
question:'Can an AI summary replace watching the video?',answer:'No. Use it to organise review. Before responding to an incident or sharing a report, check the original video for details the summary may have missed or described incorrectly.'},
'custom-text-alerts': {
keyword:'AI CCTV custom alerts',
intro:'Some situations are easier to describe than to select from a menu. Supported AI CCTV platforms let you write an alert condition, such as a forklift entering a pedestrian area. The system then looks for that condition in the configured camera views.',
advice:'Keep each rule specific. Name the object, action and area you care about, then test examples that should and should not trigger it. Agree who receives the alert and what they should do; a notification without a response process adds little value.',
question:'Will any written instruction work as an alert?',answer:'No. Supported concepts and processing capacity differ between platforms. A written rule must be tested on representative footage before it is used operationally.'},
'edge-ai': {
keyword:'Edge AI CCTV camera',
intro:'An edge AI CCTV camera analyses supported events on its own processor. That can reduce the need to send continuous video elsewhere just to identify an event. For a factory with several buildings, processing location is an important part of the network and system design.',
advice:'Ask which analytics run on the camera and which still need a recorder or server. Check how many functions can run together. Also separate local detection from remote alerts: a camera may detect an event locally while a phone notification still needs connectivity.',
question:'Will an edge AI camera work without internet?',answer:'Some local functions can, depending on the device and setup. Remote access, cloud search and notifications may still require internet. Test the intended outage behaviour rather than relying on the edge AI label.'},
'object-classification': {
keyword:'Human and vehicle detection CCTV',
intro:'A moving branch should not demand the same attention as a person at your gate. Human and vehicle detection classifies supported objects so you can decide which movement matters. It is often a practical first step when ordinary motion alerts become too noisy.',
advice:'Test a normal working day as well as quiet hours. Include headlights, rain, shadows and people carrying large objects. Review missed events alongside false alerts; making a system quieter is not helpful if it also stops reporting activity you need to see.',
question:'Does human detection remove all false alarms?',answer:'No. Small subjects, poor lighting and unusual camera angles can confuse classification. Good installation and testing matter as much as the feature name on the box.'},
'virtual-perimeter': {
keyword:'AI CCTV intrusion detection',
intro:'You do not need an alert every time someone walks through a working factory. You need one when a person enters a restricted area or crosses a boundary at the wrong time. AI CCTV intrusion detection lets you define the relevant zone, object type and schedule.',
advice:'Draw the boundary around the area you control, excluding public roads and normal pedestrian routes. Walk through the scene during the day and at night. Check the recorded event and notification together so you know the team receives enough context to respond.',
question:'Can intrusion detection tell whether a person is authorised?',answer:'A boundary-crossing event alone cannot establish authorisation. Schedules, access-control records or operator review may be needed to decide whether an entry is permitted.'},
'loitering': {
keyword:'CCTV loitering detection',
intro:'A person briefly passing a shuttered shop is different from someone remaining near the entrance for several minutes. CCTV loitering detection measures time spent in a configured area and can flag a threshold for review. It describes presence, not intent.',
advice:'Choose the threshold around how the area is actually used. A delivery waiting point needs a different rule from a restricted doorway. Exclude places where staff or customers routinely wait, then review whether the remaining alerts are useful.',
question:'Does a loitering alert mean someone is suspicious?',answer:'No. It means the configured time threshold was reached. An operator needs to check the circumstances before taking action.'},
'number-plates': {
keyword:'ANPR camera for Indian number plates',
intro:'An ANPR camera reads a visible number plate and creates a record your team can search. At a factory gate or housing society entrance, that can make vehicle arrivals easier to review. Access automation is a separate integration that needs its own rules and checks.',
advice:'Test the actual Indian plates, approach angles and speeds seen at your entrance. Include two-wheelers, dirty plates and headlights after dark. Ask for the original plate image beside the recognised text so mistakes can be spotted and corrected.',
question:'Can my existing CCTV camera read number plates?',answer:'Possibly, if the plate is captured at a suitable size and exposure. A wide overview camera may not provide enough detail. A dedicated plate-capture view can be necessary.'},
'ptz-tracking': {
keyword:'AI auto tracking PTZ camera',
intro:'A PTZ camera can physically pan, tilt and zoom. With supported AI auto tracking, it can follow a selected person or vehicle through its viewing area. This can help an operator keep a moving subject in view across an open industrial yard.',
advice:'Plan what watches the rest of the yard while the PTZ follows one target. Test how tracking behaves when the subject passes behind an obstruction, when two objects cross and when tracking ends. Fixed overview cameras may still be useful alongside it.',
question:'Can software make a fixed camera auto-track like a PTZ?',answer:'Software can crop or follow an object within a fixed image, but it cannot add physical pan, tilt or optical zoom to a camera without those mechanisms.'},
'people-counting': {
keyword:'People counting camera for retail stores',
intro:'Busy feels different to different people. A people counting camera gives you a more consistent view of entries, exits or occupancy, depending on the setup. Retail teams can use the figures to compare opening hours, staffing patterns and periods of high footfall.',
advice:'Decide what you want to measure before choosing the camera. Door crossings and current occupancy are different questions. Compare sample counts with a manual tally, and account for staff movement, multiple entrances and groups walking close together.',
question:'Is footfall the same as the number of customers?',answer:'No. A crossing count may include staff, repeat visits and people who do not buy. Interpret it alongside your operating hours and other business data.'},
'queue-analytics': {
keyword:'CCTV queue management analytics',
intro:'A queue can build before a supervisor notices it. CCTV queue analytics monitors a defined waiting area so a team can review congestion and decide when to open another counter or adjust staffing. The useful signal is the one that leads to a practical response.',
advice:'Define where the queue begins and ends. Test groups standing beside the line and people who leave before reaching the counter. Review both the alert threshold and the time it takes staff to respond; a dashboard alone will not shorten a wait.',
question:'Can one camera measure every queue in a shop?',answer:'Only if the views and supported analytics are suitable. Overlapping queues, obstructions and distant subjects may require separate camera coverage.'},
'tailgating': {
keyword:'CCTV tailgating detection for access control',
intro:'When two people pass through an entrance close together, a camera can flag the movement for review. To determine whether the second entry was unauthorised, your team may need to compare the video with access-control events. Counting movement and checking permission are different tasks.',
advice:'Test real entrance behaviour: visitors carrying bags, staff holding doors, deliveries and shift changes. Agree how close entries must be to trigger a review. Where possible, show the relevant access event and camera clip together.',
question:'Does tailgating detection stop someone entering?',answer:'Detection by itself only identifies an event. Physical prevention requires appropriately designed access hardware and a response process.'},
'ppe-detection': {
keyword:'AI PPE detection camera',
intro:'A supervisor cannot watch every site entrance at once. AI PPE detection can flag supported conditions such as a missing hard hat or high-visibility vest, giving the team another way to review equipment use. It supports supervision rather than replacing it.',
advice:'Ask exactly which equipment types the system detects. Test the helmets, vests, uniforms and working positions used on your site. A clear checkpoint view may be more useful than a distant camera covering an entire construction area.',
question:'Does PPE detection prove that a site is compliant?',answer:'No. It checks supported visible conditions within a camera view. Equipment quality, correct use and wider safety obligations require separate assessment.'},
'onsite-learning': {
keyword:'Custom object detection CCTV',
intro:'Your site may use equipment that a standard camera model does not recognise. On-site learning allows supported systems to learn a custom object from examples, such as a particular trolley used on a production floor. The result depends on the training material and installation.',
advice:'Collect examples from different angles and normal lighting conditions. Keep some examples aside for testing rather than training. Include similar objects that should not match, so you can see whether the model has learnt the intended distinction.',
question:'Can I teach the camera to recognise anything?',answer:'No. Suitable object shape, visibility, training quality and model support all matter. Test the specific object before committing to a wider installation.'},
'scene-change': {
keyword:'AI CCTV scene change detection',
intro:'Sometimes the important event is something left behind. Scene-change detection compares a monitored area with a learnt reference and flags a difference. A warehouse team might use it to review cartons appearing in a normally clear passage.',
advice:'Choose a scene that has a meaningful normal state. Consider cleaning, scheduled stock movement and lighting changes before deciding what counts as an exception. Test how the system resets after the area returns to normal.',
question:'Is scene-change detection the same as camera tampering detection?',answer:'No. Scene change looks for a changed condition within the view. Tampering detection typically concerns a blocked, redirected or otherwise disrupted camera view.'},
'sound-classification': {
keyword:'AI audio detection CCTV',
intro:'A camera cannot see around a corner, but a supported microphone may capture a relevant sound. AI audio detection can classify selected sound types and attach another signal to the video review process. Glass breaking is one example offered by some systems.',
advice:'Check the microphone location and ambient noise before choosing a classifier. Test the sounds likely to occur during normal business, not just a quiet-room demonstration. Decide whether audio needs to be recorded or only analysed, with appropriate access and retention arrangements.',
question:'Will a built-in microphone automatically provide sound classification?',answer:'No. Capturing audio and recognising a sound category are separate capabilities. The hardware, software and supported sound classes must all be confirmed.'},
'privacy-masking': {
keyword:'AI face privacy masking CCTV',
intro:'You may need to understand activity without showing every person’s face to every viewer. AI privacy masking obscures detected faces in supported streams while leaving useful scene context visible. The right configuration depends on who views the footage and why.',
advice:'Ask whether masking happens before recording, only during viewing, or only on exported clips. Check who can see the original stream. Test side profiles, people at the edge of the frame and crowded scenes for missed masks.',
question:'Does face masking make a recording anonymous?',answer:'Not necessarily. Clothing, location and other details can still reveal identity. Masking is one control within a wider privacy and access arrangement.'},
'low-light-ai': {
keyword:'AI CCTV camera night vision',
intro:'Night footage can look bright yet contain too little usable detail. AI image processing can reduce noise and improve a difficult scene, but it works with the light and detail the camera actually captures. A good night-view demonstration should include movement, not just an empty entrance.',
advice:'Test a walking person and moving vehicle under your real lights. Look for motion blur, smeared detail and headlights obscuring plates. Compare the original footage at a useful playback size rather than judging a small preview on a phone.',
question:'Can AI night vision see clearly in complete darkness?',answer:'It cannot create reliable scene information without a usable signal. The camera may need infrared or visible illumination, depending on its design and the detail you need.'},
'smoke-flame': {
keyword:'Video smoke and flame detection',
intro:'Specialist video fire detection looks for visible patterns associated with smoke or flames. In a suitable industrial setting, it can provide an additional view of an emerging incident. This is a specialist design decision, not a general feature to assume on every AI camera.',
advice:'Involve a qualified fire-system professional before selecting equipment or deciding its role. The camera view, lighting, likely fire conditions and response process all affect the design. Follow the manufacturer’s commissioning and approved testing procedures.',
question:'Can an ordinary CCTV camera replace fire detectors?',answer:'Do not assume it can. The role of video detection depends on the approved equipment, system design and applicable requirements. Existing required fire protection must remain properly addressed.'},
};
