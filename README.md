# Astaghfirullah Tasbih — Android Studio project

This project wraps the supplied `Astaghfirullah Tasbih` HTML experience in a lightweight Android WebView app. The HTML is bundled locally, so the main app experience does not require a hosted website. The original HTML requests Google Fonts from the internet; if offline, device/system fallback fonts are used.

## Build with Android Studio
1. Install the latest stable Android Studio and Android SDK Platform 36.
2. Open this folder (`AstaghfirullahTasbihAndroid`) in Android Studio.
3. Allow Gradle sync to finish. The project uses Android Gradle Plugin 8.13.2 and Java.
4. Test on a real Android phone or emulator.
5. To create a Play Store file: **Build → Generate Signed Bundle / APK → Android App Bundle**.
6. Create and securely back up your own upload key. Do not share it or commit it to source control.
7. Upload the signed `.aab` in Google Play Console, complete the store listing, Data safety form, content rating, target audience, app access, and testing requirements, then submit for review.

## Before publishing
- Replace `com.example.astaghfirullahtasbih` with a unique permanent application ID before the first release.
- Add a production launcher icon and store listing screenshots.
- Test counting, controls, screen sizes, rotation behavior, and offline operation.
- Verify the final privacy/data-safety declarations against the actual app and any third-party SDKs you add. This project currently includes no analytics or ad SDKs and requests no Android permissions.
- Ensure you have rights to all bundled assets and fonts. The supplied HTML references Google Fonts online.
- New Google Play apps and updates must target API 36 or higher starting August 31, 2026. Check Play Console for current policies before submitting.

## Current project limits
This is the Android Studio source project, not a prebuilt APK/AAB. A release bundle must be built and signed in your environment with your signing key. Google Play publication is not automatic and approval is decided by Google.

## Build a directly installable APK using GitHub Actions
This repository includes `.github/workflows/build-apk.yml`, which builds a **debug APK** automatically in GitHub's cloud build runner. A debug APK is suitable for installing and testing on your own Android phone; it is not the recommended signed release artifact for Google Play.

1. Sign in to GitHub and create a **new private repository**.
2. Upload the contents of this project folder to the repository (including the hidden `.github` folder). Alternatively, extract this ZIP locally, create a Git repository, and push the folder to GitHub.
3. Open the repository on GitHub and select **Actions**.
4. Choose **Build installable APK** in the workflows list, then click **Run workflow**. A push to `main` or `master` also triggers the build.
5. When the run completes successfully, open that workflow run and download the artifact named **Astaghfirullah-Tasbih-debug-APK**.
6. Extract the artifact ZIP to find `app-debug.apk`, then transfer it to your Android phone and tap it to install. Android may ask you to allow installation from that source; only enable this for the trusted source you used and turn it off again afterwards.

The APK is unsigned by a personal release key (Android debug-signed for testing). It can be installed directly, but it is **not a Google Play release**. For Play Store publishing, generate a signed Android App Bundle with your own securely backed-up upload key. Never share your private signing key or passwords.


## App icon assets included
- Android launcher PNGs for mdpi, hdpi, xhdpi, xxhdpi, and xxxhdpi.
- Android adaptive icon XML for Android 8.0+ using a foreground PNG and navy background.
- `app/src/main/assets/app-icons/app-icon-512.png`: 512×512 PNG app icon.
- `app/src/main/assets/app-icons/app-icon-maskable-512.png`: 512×512 PNG with extra padding for maskable use.
- `original-generated-icon.png`: original generated artwork.
