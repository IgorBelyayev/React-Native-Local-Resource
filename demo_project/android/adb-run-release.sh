./gradlew assembleRelease
adb install -r ./app/build/outputs/apk/release/app-release.apk
adb shell am start -n com.reactnativelocalresourcedemo/.MainActivity
