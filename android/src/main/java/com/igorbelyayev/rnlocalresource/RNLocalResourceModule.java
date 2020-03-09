
package com.igorbelyayev.rnlocalresource;

import android.content.res.Resources;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import static com.facebook.react.common.StandardCharsets.UTF_8;

public class RNLocalResourceModule extends ReactContextBaseJavaModule {


    public RNLocalResourceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNLocalResourceModule";
    }

    @ReactMethod
    public void getRawResource(String name, Promise promise) {
        try {
            ReactApplicationContext context = getReactApplicationContext();
            Resources resources = context.getResources();
            String packageName = context.getPackageName();
            int id = resources.getIdentifier(name, "raw", packageName);
            InputStream stream = resources.openRawResource(id);
            try {
                InputStreamReader reader = new InputStreamReader(stream, UTF_8);
                char[] buffer = new char[DEFAULT_BUFFER_SIZE];
                StringBuilder builder = new StringBuilder();
                int n;
                while ((n = reader.read(buffer)) != EOF) {
                    builder.append(buffer, 0, n);
                }
                String result = builder.toString();
                promise.resolve(result);
            } finally {
                try {
                    stream.close();
                } catch (IOException ioe) {
                    // ignore
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

    private static final int EOF = -1;
    private static final int DEFAULT_BUFFER_SIZE = 1024 * 4;
}
