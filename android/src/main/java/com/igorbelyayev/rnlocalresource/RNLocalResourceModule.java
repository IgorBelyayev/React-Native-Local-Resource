
package com.igorbelyayev.rnlocalresource;

import android.content.res.Resources;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;

public class RNLocalResourceModule extends ReactContextBaseJavaModule {


    public RNLocalResourceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNLocalResourceModule";
    }

    @ReactMethod
    public void getRawResource(String rawResourceUri, Promise promise) {
        int resId = getResourceId(rawResourceUri);
        try {
            String resourceAsString = readResourceAsString(resId);
            promise.resolve(resourceAsString);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

    private String readResourceAsString(int resId) throws IOException {
        Resources resources = getReactApplicationContext().getResources();

        InputStream is = resources.openRawResource(resId);
        try {
            return IOUtils.toString(is);
        } finally {
            IOUtils.closeQuietly(is);
        }
    }

    private int getResourceId(String resourceUri) {
        Resources resources = getReactApplicationContext().getResources();
        String packageName = getReactApplicationContext().getPackageName();
        return resources.getIdentifier(resourceUri, "raw", packageName);
    }
}