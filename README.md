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

v6: Reel studio (panel top): Reel mode, 4 video scenes (Flower jar, Sky lanterns, Noor tree, Moon galaxy), Record video (saves 1080x1920 mp4/webm), Channel name watermark.
v6.1: +3 scenes (Lotus mandala, Firefly night, Butterfly meadow), faster tree/moon, Quick video (~20s for 33).
v7: top reset button (hidden while recording), Android video saving to Movies/Tasbih, in-page channel name box.
