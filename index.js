import {NativeModules, Platform} from 'react-native';

const {RNReactNativeLocalResource} = NativeModules;
const {OS} = Platform;
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export default async function loadLocalRawResource(source) {

    const uri = getUriFromSource(source);
    if (OS == "android" && isUriAnAndroidResourceIdentifier(uri)) {
        return loadAndroidRawResource(uri);
    } else {
        return loadResourceUsingFetch(uri);
    }
}

function getUriFromSource(source) {
    const resolvedAssetSource = resolveAssetSource(source);
    return resolvedAssetSource.uri;
}

async function loadAndroidRawResource(uri) {
    try {
        return await RNReactNativeLocalResource.getRawResource(uri);
    } catch (e) {
        console.error("Error in RawResourceUtils while trying to natively load an Android raw resource: ", e);
        return null;
    }
}

async function loadResourceUsingFetch(uri) {
    const blob = await fetch(uri);
    return await blob.text();
}

function isUriAnAndroidResourceIdentifier(uri) {
    return typeof uri == "string" && uri.indexOf("/") <= -1;
}
