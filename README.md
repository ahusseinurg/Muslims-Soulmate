# Muslims Soulmate

Muslims Soulmate is a public-testing relationship and community app for Muslim adults. This repository contains the full hosted web-app source, Android and iOS wrapper projects, database migrations, tests, and the downloadable Android beta.

## Try the app

- Public web app: https://muslims-soulmate.ayhusse1.chatgpt.site
- Android APK: [Download Muslims-Soulmate-Android-Beta.apk](https://github.com/ahusseinurg/Muslims-Soulmate/raw/refs/heads/main/downloads/Muslims-Soulmate-Android-Beta.apk)

On Android, open the downloaded APK and allow installation from your browser or Files app if prompted. The current Android wrapper checks `downloads/update.json` when it opens and offers future native updates. Android still requires the tester to approve each installation.

## Current beta features

- Profile browsing without swiping, optional approximate GPS, sect, age, religiosity, bio, and marital history
- Camera-only portrait and full-body profile photos with six-month renewal rules
- “Asc” inquiries, text and voice messages, attachments, groups, stories, blocking, and safety reminders
- Audio/video calling and Android notification prototypes
- Events, including free registration and paid-event setup with a configurable 5% platform fee
- Annual background-check verification workflow and paid-membership setup
- Health Share planning groups for voluntary contribution tracking; this is not presented as insurance
- Fictional preview profiles with original generated portraits

## Development

The hosted app uses Node.js, Vinext, Cloudflare Workers, D1, and R2.

```bash
npm ci
npm run build
node --test tests/access.cjs tests/features.cjs
```

Runtime credentials and provider secrets are intentionally not included. Stripe, a background-check provider, production push delivery, TURN infrastructure, and any regulated health-benefit program require separate provider configuration and legal/compliance review.

## Mobile builds

The Android project is under `mobile/android`. GitHub Actions builds an unsigned release artifact for owner signing. The installable beta under `downloads/` is signed with the existing test key. Future APKs must retain the same application ID and signing key and use a higher version code.

The iOS project under `mobile/ios` requires Apple signing before it can be installed on iPhones.

See [mobile/TESTING-GUIDE.md](mobile/TESTING-GUIDE.md) for test guidance.
