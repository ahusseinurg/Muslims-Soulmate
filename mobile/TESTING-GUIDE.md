# Muslims Soulmate — beta 0.3

This build adds direct audio/video calling, voice messages, chat photo/video/audio attachments, Android live background alerts, 13 core-interface language options, annual background-check records, membership plans, safety reminders, and free/paid event workflows.

## New test steps

- Open a conversation accepted by both members. Use the microphone button, stop recording, listen to the preview, and send it. Recording supports any spoken language and stops after two minutes. Files are not automatically translated or transcribed.
- Use the attachment button for photos or videos (20 MB maximum). Profile portraits and full-body photos still require the live camera and expire after six months.
- Use the phone/video buttons above the page while a conversation is selected. Both testers must keep the app open. This is a direct WebRTC beta; restrictive networks require TURN_URL, TURN_USERNAME and TURN_CREDENTIAL. No real-phone calling test was performed here.
- Android: Settings → Notifications → Enable Android alerts. Allow notifications. This starts a visible ongoing connection notification with a Stop action. Messages, inquiries and calls generate generic private alerts. Android battery restrictions, loss of connectivity, session expiry, force-stop, or reboot can interrupt delivery. This is a foreground-service SSE connection, not Firebase push. Reopen the app and re-enable it if necessary.
- Use the language selector. English, Somali, Arabic, Urdu, Hindi, Bengali, French, Spanish, Portuguese, Turkish, Indonesian and Swahili plus Chinese are offered. Core navigation, profile fields, call/voice controls and brief safety reminders are localized. Longer settings, owner tools, and provider text still require further localization. Arabic and Urdu use right-to-left layout. User messages are preserved in their original language.
- Upload a story photo or short video, then have the owner approve it in Settings. Public media is not published before approval. Private chat attachments are visible only to conversation members; automated audio/image moderation is not connected.
- Membership: Free includes 5 new Asc inquiries per day; Plus 25; Premium 100. Draft monthly prices are $9.99 and $19.99, with no charges enabled. Configure Stripe secret key and monthly Price IDs to activate Checkout. Actual displayed prices then come from Stripe. Subscription status refreshes from Stripe on app entry and can be refreshed manually; recurring webhook processing is not implemented.
- Annual background check: member requests it and consents; owner independently verifies the provider record and records the provider, reference, and completion date. The badge expires after one year. A request, membership payment, or self-claim does not create a badge. No real background-check provider has been connected and no checks have been ordered.

## Events and the 5% fee

Members can create adult events at public venues with a date, capacity and description. Free events allow immediate signup, duplicate protection, withdrawal and organizer cancellation. Organizer attendance lists are private to the organizer.

Paid events require a connected Stripe Express payout account and verified payout capability. USD ticket prices are supported. Default app commission is 5%, configurable by the owner in Events. The fee is rounded in cents and fixed for each checkout; a $20 ticket has a $1 app fee and $19 organizer proceeds before any other provider adjustments. Stripe processing fees are separate and depend on the platform account.

Stripe Checkout collects payment and sends proceeds to the organizer using a destination charge/application fee. A reserved ticket is not marked paid until Stripe confirms payment. The organizer can request a full refund, including reversal of the transfer and app fee. Paid checkouts and payouts remain disabled until STRIPE_SECRET_KEY is set and Connect onboarding completed. No live payment or payout was tested.

Safety reminders discourage sharing private addresses, identity documents, passwords, banking details and verification codes. They recommend public meetings, telling a trusted person your plans, using your own transport and never sending money to a new match. A background-check badge does not guarantee safety.

## Existing install/access instructions

## Android

Share `Muslims-Soulmate-Android-Beta.apk` with invited adult testers. On an Android 8 or newer phone, download it, open the file, and allow installation from that download source if Android asks. Open Muslims Soulmate. An internet connection is required.

This is a native Android container for the shared online app, not a separate offline database. The Browser button opens the same app in the default browser. If an identity provider refuses embedded-browser sign-in, use Browser; its session is separate from the embedded app. Native sign-in and camera/GPS permission flows still need a real-device test.

The APK was compiled and its Android signature verified. It has not been installed on a physical device or emulator in this environment.

## iPhone — test immediately without the App Store

After receiving access, open https://muslims-soulmate.ayhusse1.chatgpt.site in Safari. Sign in using the invited account. Tap Share, then Add to Home Screen. This installs a home-screen web app; it is not an IPA/native iOS installation.

## Native iPhone project

`ios/MuslimsSoulmate.xcodeproj` is the native SwiftUI/WKWebView project. It requires a Mac with Xcode. No signed IPA is included, and the iOS project has not been compiled here because Xcode is unavailable.

Open the project, select the MuslimsSoulmate target, and choose your Apple development team under Signing & Capabilities. Keep or register `com.dadir.muslimssoulmate` as the bundle identifier. Connect an iPhone and run it for a device test.

For friend distribution without an App Store listing, use Apple’s Ad Hoc distribution with an Apple Developer Program account and registered test devices. Archive the app for a generic iOS device, then use Organizer → Distribute App and the registered-device / Ad Hoc option. TestFlight is another beta option, but it uses App Store Connect and external beta review may be required. An unsigned IPA cannot simply be emailed and installed.

Apple documentation:
- https://developer.apple.com/documentation/xcode/distributing-your-app-to-registered-devices
- https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases

## Access — required before friends can test

The online app is currently restricted to the owner. Installing the APK does not grant access. Provide the email addresses of adult friends to invite. They will need to sign in using those accounts. The owner must explicitly authorize the invitations; no invitations have been sent.

## Test the requested changes

1. Create a profile with name, age (18+), gender, manually entered location, bio, religiosity, optional sect, and marital history.
2. In My profile, take a portrait through the camera. No gallery picker is available for profile photos.
3. Take a full-body picture with head and feet visible. Use the five-second timer or ask someone to hold the phone.
4. Try brightness and contrast, limited to 90–110%. These only adjust lighting; there is no smoothing, beautification, or face/body reshaping.
5. The owner reviews captures in Settings → Review profile photos. Approve only clear, modest, correctly framed images. Both current photos must be approved before discovery and Asc inquiries are enabled.
6. Each picture has its own six-calendar-month expiry date. Expired pictures stop displaying and must be retaken. Dates are assigned by the server and cannot be extended by editing the profile.
7. Turn GPS on in Settings and allow location permission. Tap Update my GPS location to refresh it. Approximate distances appear only when both people have opted in and updated GPS within 24 hours. Precise coordinates are never returned to other members. Turning GPS off deletes the saved coordinates.
8. Send Asc between two approved profiles; accept it from the recipient account; exchange text messages. Test blocking and group membership.

## Current limits

Camera-only capture restricts the normal app workflow but cannot prove identity or prevent somebody photographing an old image or using a manipulated device/virtual camera. Liveness/identity verification is not implemented. Full-body framing and nudity checks rely on owner review for profile pictures. Other media remains private pending moderation integration.

Public independent signup, automatic media moderation, reliable TURN relay credentials, live payments, and an automatic background-check provider still need setup. No account credentials, Apple signing certificates, or private signing keys are included in this source package.
