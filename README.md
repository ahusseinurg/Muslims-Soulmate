# Muslims Soulmate — mobile beta

This repository contains the Android beta APK, Android source, iPhone source project, test instructions, and automated Android build workflows.

## Install on Android

1. Download [Muslims-Soulmate-Android-Beta.apk](https://github.com/ahusseinurg/Muslims-Soulmate/raw/refs/heads/main/downloads/Muslims-Soulmate-Android-Beta.apk).
2. Open the downloaded file on an Android 8 or newer phone.
3. If Android asks, allow **Install unknown apps** for the browser or Files app used to open it.
4. Choose **Install**, then **Open**.

The APK is already signed for beta testing. Compare its SHA-256 value with `downloads/SHA256SUMS` if you want to verify the download.

The hosted application remains private at https://muslims-soulmate.ayhusse1.chatgpt.site. Installing the APK does not automatically give a friend account access.

## Included

- Android beta APK and source
- iPhone Xcode source project
- Camera, microphone, location, and notification permissions
- GitHub Actions source-build and release workflows
- Testing guide and release notes

## GitHub Actions

**Android source build** compiles the Android project with Java 17, Gradle 8.9, and Android API 35. It produces an unsigned release artifact for owner signing.

**Publish signed Android beta** can publish the bundled signed APK as release `v0.3.0-beta`. Run it manually from the Actions tab. It requires Actions and repository contents-write permission.

Future updates must use the original owner signing key and increment `versionCode`. Never commit signing keys, passwords, payment credentials, background-check credentials, or notification-provider secrets.

## iPhone

The Xcode project in `mobile/ios` is source only. An installable iPhone build still requires Apple signing and an approved distribution route. Testers can use the hosted web app in Safari after receiving account access.

See [mobile/TESTING-GUIDE.md](mobile/TESTING-GUIDE.md) for current functionality, safety checks, and remaining production integrations.
