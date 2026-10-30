package com.example.astaghfirullahtasbih;

import android.app.Activity;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;
    private OutputStream vos;

    /** Lets the page save recorded videos into Gallery (Movies/Tasbih). */
    private class Saver {
        @JavascriptInterface public boolean begin(String name, String mime) {
            try {
                end();
                if (Build.VERSION.SDK_INT >= 29) {
                    ContentValues v = new ContentValues();
                    v.put(MediaStore.Video.Media.DISPLAY_NAME, name);
                    v.put(MediaStore.Video.Media.MIME_TYPE, mime);
                    v.put(MediaStore.Video.Media.RELATIVE_PATH, Environment.DIRECTORY_MOVIES + "/Tasbih");
                    Uri u = getContentResolver().insert(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, v);
                    vos = getContentResolver().openOutputStream(u);
                } else {
                    vos = new FileOutputStream(new File(getExternalFilesDir(Environment.DIRECTORY_MOVIES), name));
                }
                return vos != null;
            } catch (Exception e) { return false; }
        }
        @JavascriptInterface public boolean chunk(String b64) {
            try { vos.write(Base64.decode(b64, Base64.DEFAULT)); return true; } catch (Exception e) { return false; }
        }
        @JavascriptInterface public void end() {
            try { if (vos != null) vos.close(); } catch (Exception e) { }
            vos = null;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(android.graphics.Color.rgb(4, 10, 20));
        getWindow().setNavigationBarColor(android.graphics.Color.rgb(4, 10, 20));

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        webView = new WebView(this);
        webView.setBackgroundColor(android.graphics.Color.rgb(4, 10, 20));
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true); // Required by the supplied Tasbih HTML.
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMediaPlaybackRequiresUserGesture(false); // lets auto-count sounds play
        settings.setUserAgentString(settings.getUserAgentString() + " TasbihApp");
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setSupportMultipleWindows(false);
        webView.addJavascriptInterface(new Saver(), "TasbihSaver");
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        setContentView(webView);
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView != null) {
            webView.evaluateJavascript("window.__back ? window.__back() : false", value -> {
                if (!"true".equals(value)) finish();
            });
        } else super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.stopLoading();
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }
}
