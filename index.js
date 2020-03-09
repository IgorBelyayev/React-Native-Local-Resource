import {NativeModules, Platform} from 'react-native';

const {RNLocalResourceModule} = NativeModules;
const {OS} = Platform;
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

export async function loadLocalRawResourceAndroid(source) {
    const uri = getUriFromSource(source);
    if (isUriAnAndroidResourceIdentifier(uri)) {
        return loadAndroidRawResource(uri);
    } else {
        return loadResourceUsingFetch(uri);
    }
}

export async function loadLocalRawResourceDefault(source) {
    const uri = getUriFromSource(source);
    return loadResourceUsingFetch(uri);
}

const loadLocalRawResource = OS == "android" ? loadLocalRawResourceAndroid : loadLocalRawResourceDefault;

export default loadLocalRawResource;

export function getUriFromSource(source) {
    const resolvedAssetSource = resolveAssetSource(source);
    return resolvedAssetSource.uri;
}

export async function loadAndroidRawResource(uri) {
    try {
        return await RNLocalResourceModule.getRawResource(uri);
    } catch (e) {
        console.error("Error in RawResourceUtils while trying to natively load an Android raw resource: ", e);
        return null;
    }
}

export async function loadResourceUsingFetch(uri) {
    const blob = await fetch(uri);
    return await blob.text();
}

export function isUriAnAndroidResourceIdentifier(uri) {
    return typeof uri == "string" && uri.indexOf("/") <= -1;
}
