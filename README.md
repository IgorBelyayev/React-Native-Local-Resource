
# react-native-react-native-local-resource

## Getting started

`$ npm install react-native-react-native-local-resource --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-local-resource`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.igorbelyayev.rnlocalresource.RNReactNativeLocalResourcePackage;` to the imports at the top of the file
  - Add `new RNReactNativeLocalResourcePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-local-resource'
  	project(':react-native-react-native-local-resource').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-local-resource/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-local-resource')
  	```


## Usage
```javascript
import RNReactNativeLocalResource from 'react-native-react-native-local-resource';

// TODO: What to do with the module?
RNReactNativeLocalResource;
```
  