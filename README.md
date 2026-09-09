# Muslims Soulmate — mobile beta

Prepared for ahusseinurg. This repository package has not yet been uploaded to GitHub.

## Install Android

Open `downloads/Muslims-Soulmate-Android-Beta.apk` on GitHub and choose Download raw file. Open the downloaded APK on Android 8 or newer and allow installation from your browser when prompted. The signed APK is already built. No GitHub Actions run is needed to install it.

The hosted application remains private at https://muslims-soulmate.ayhusse1.chatgpt.site. Installing the APK does not grant a friend access; the owner must arrange tester access separately.

## Publish a convenient release

Create a repository named `muslims-soulmate` at https://github.com/new with a README, then provide its link to the assistant to upload these files. A public repository permits downloads without a GitHub account; a private repository requires granting repository access to testers. Visibility of this repository does not change hosted app access.

After these files are committed to the default branch, run Actions → Publish signed Android beta → Run workflow. It publishes the bundled signed APK as release v0.3.0-beta. Run once; it deliberately fails if that tag already exists, preserving existing releases. The workflow requires Actions and contents-write permission. It has been prepared but not run on GitHub.

## Future source builds

Android source build uses Java 17, Gradle 8.9 and Android API 35. It produces an UNSIGNED release artifact, which cannot be installed until the owner signs it. Future updates must use the owner's original signing key and increment versionCode. The private signing backup is intentionally absent. Never commit signing keys, passwords or provider credentials. The workflow does not silently substitute a different debug key.

## iPhone

The Xcode project under mobile/ios is source only and has not been compiled or signed. GitHub downloads cannot bypass Apple signing. Use the existing web app in Safari for testing once account access is enabled, or arrange Apple-signed native distribution.

See mobile/TESTING-GUIDE.md for features and remaining integration/device-test requirements. Backend source and hosting credentials are not in this mobile distribution package; the backend remains in its existing source project.

References: https://cli.github.com/manual/gh_release_create and https://developer.android.com/build/releases/agp-8-7-0-release-notes
