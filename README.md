
# React-Native-Local-Resource

This library allows you to include resources of any type in your javascript source folders and load
them without having to do anything special. It supports iOS and Android, 
including **Android release mode**.

## Getting started

`$ yarn add react-native-local-resource`

or

`$ npm install react-native-local-resource --save`

### Mostly automatic installation

Native installation is required to support Android release mode. 

`$ react-native link react-native-local-resource`

### Manual installation


#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.igorbelyayev.rnlocalresource.RNLocalResourcePackage;` to the imports at the top of the file
  - Add `new RNLocalResourcePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-local-resource'
  	project(':react-native-local-resource').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-local-resource/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-local-resource')
  	```

#### iOS

Not required.

## Usage

#### Specify file extensions

You will need a [rn-cli.config.js](https://facebook.github.io/react-native/docs/understanding-cli#cli-configs
) file in order to use this library. Check your root project directory to see if you
already have this file and if you don't, create it.


##### React Native versions 0.57 or greater

Then, inside a `module.exports` object,
create a key called `resolver` with another object with a key called `assetExts`. 
The value of `assetExts` should be an array of the resource file extensions you want to support. 

For example, if you want to support `md` files, your `rn-cli.config.js` would like like this:
```javascript
module.exports = {
    resolver: {
        assetExts: ["md"]
    }
}
```

##### React Native versions below 0.57

Then, inside a `module.exports` object,
create a function called `getAssetExts` which returns an array of the resource file
extensions you want to support. 

For example, if you want to support `md` files, your `rn-cli.config.js` would like like this:
```javascript
module.exports = {
    getAssetExts() {
        return ["md"]
    }
}
```


#### Calling the library

The library exposes a single `async` function which accepts the source of the resource as the argument
and returns the string content of the resource. 

Example usage:

```javascript
import loadLocalResource from 'react-native-local-resource'
import myResource from './my_resource.md'

function example() {
    loadLocalResource(myResource).then((myResourceContent) => {
            console.log("myResource was loaded: " + myResourceContent)
        }
    )
}
```
  
