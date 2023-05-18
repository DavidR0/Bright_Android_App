package net.ddns.int32_t.bright;

import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    static public SharedPreferences sharedPrefs;
    static public SharedPreferences.Editor sharedPrefsEditor;
    static public WebView webViewPage;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webViewPage = findViewById(R.id.webViewPage);
        webViewPage.getSettings().setJavaScriptEnabled(true);
        webViewPage.getSettings().setDomStorageEnabled(true);///See if needed
        webViewPage.getSettings().setAllowContentAccess(true);///See if needed
        webViewPage.addJavascriptInterface(new WebAppInterface(this), "AndroidInterface");

        sharedPrefs = PreferenceManager.getDefaultSharedPreferences(this);
        sharedPrefsEditor = sharedPrefs.edit();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }


        if (sharedPrefs.getString("secret", "null") == "null" || sharedPrefs.getString("address", "null") == "null") {
            firstStart();
        } else {
            loadHtml();
        }

        StringBuilder builder = new StringBuilder();
        builder.append(sharedPrefs.getString("address", "null")).append("\n").append(sharedPrefs.getString("secret", "null")).append(sharedPrefs.getString("autoON","1"));
        Log.d("Address,Secret,autoOn", builder.toString());
    }


    private void firstStart() {
        webViewPage.setWebViewClient(new WebViewClient());
        webViewPage.loadUrl("file:///android_asset/initConfig.html");
    }

    private void loadHtml() {

        webViewPage.setWebViewClient(new WebViewClient());
        webViewPage.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webViewPage.canGoBack()) {
            webViewPage.goBack();

        } else {
            webViewPage.loadUrl("javascript:connection.close();");
            finish();
            moveTaskToBack(true);
            super.onBackPressed();
        }
    }
}

