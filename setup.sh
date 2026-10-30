#!/usr/bin/env bash
# Builds the Android Studio folder layout from this single flat folder.
# Run once:  bash setup.sh      (the GitHub workflow runs it automatically)
set -e
cd "$(dirname "$0")"
A=app/src/main
mkdir -p $A/java/com/example/astaghfirullahtasbih $A/assets $A/res/values $A/res/mipmap-anydpi-v26
for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
  mkdir -p $A/res/mipmap-$d
  cp ic_launcher_$d.png $A/res/mipmap-$d/ic_launcher.png
  cp ic_launcher_$d.png $A/res/mipmap-$d/ic_launcher_round.png
done
cp ic_launcher_foreground.png $A/res/mipmap-xxxhdpi/
cp ic_launcher.xml $A/res/mipmap-anydpi-v26/ic_launcher.xml
cp ic_launcher.xml $A/res/mipmap-anydpi-v26/ic_launcher_round.xml
cp styles.xml colors.xml $A/res/values/
cp AndroidManifest.xml $A/
cp MainActivity.java $A/java/com/example/astaghfirullahtasbih/
cp index.html install.js manifest.webmanifest sw.js app-icon-512.png app-icon-maskable-512.png $A/assets/
cp app-build.gradle app/build.gradle
echo "Android project layout ready."
