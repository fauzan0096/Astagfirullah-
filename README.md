# Tasbih (flat folder)

Every file sits in this one folder - no sub-folders.

- index.html, install.js (install popup), manifest.webmanifest, sw.js, app-icon-*.png : the web app / PWA
- MainActivity.java, AndroidManifest.xml, *.gradle, ic_launcher_*, styles.xml, colors.xml : Android wrapper
- setup.sh : arranges the Android folder layout automatically
- build-apk.yml : GitHub Actions workflow (GitHub only runs it from `.github/workflows/build-apk.yml`;
  on GitHub use Add file -> Create new file, type that path and paste this file's content)

Build APK: push to GitHub, run the "Build installable APK" workflow, download `Tasbih-debug-APK`.
Android Studio: run `bash setup.sh`, then open the folder.
Web only: host index.html + install.js + manifest.webmanifest + sw.js + app-icon-*.png together.
