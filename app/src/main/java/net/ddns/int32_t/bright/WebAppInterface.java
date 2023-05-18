package net.ddns.int32_t.bright;

import android.content.Context;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import static android.content.Context.VIBRATOR_SERVICE;
import static net.ddns.int32_t.bright.MainActivity.webViewPage;


public class WebAppInterface {
    Context mContext;


    // Instantiate the interface and set the context
    WebAppInterface(Context c) {
        mContext = c;
    }


    //Receive the address from the webView app
    @JavascriptInterface
    public void sendAddress(String address) {
        MainActivity.sharedPrefsEditor.putString("address", address);
        MainActivity.sharedPrefsEditor.commit();
    }

    //Send Address to the WebView app
    @JavascriptInterface
    public static String getAddress() {
        return MainActivity.sharedPrefs.getString("address", "If you got here something went really wrong");
    }

    //Receive the secret from the webView app
    @JavascriptInterface
    public void sendSecret(String secret) {
        MainActivity.sharedPrefsEditor.putString("secret", secret);
        MainActivity.sharedPrefsEditor.commit();
    }

    //Send Address to the WebView app
    @JavascriptInterface
    public String getSecret() {
        return MainActivity.sharedPrefs.getString("secret", "If you got here something went really wrong");
    }

    @JavascriptInterface
    public void sendToastMessage(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void removeDevice() throws InterruptedException {
        MainActivity.sharedPrefsEditor.clear();
        MainActivity.sharedPrefsEditor.commit();


        webViewPage.post(new Runnable() {
            @Override
            public void run() {
                webViewPage.loadUrl("file:///android_asset/initConfig.html");

                webViewPage.setWebViewClient(new WebViewClient() {

                    @Override
                    public void onPageFinished(WebView view, String url) {
                        webViewPage.clearCache(true);
                        webViewPage.clearHistory();
                    }

                });
            }
        });

 }

    @JavascriptInterface
    public void sendBulbConsumption(String watts, String bulbNb) {
        MainActivity.sharedPrefsEditor.putString("bulbConsumption" + bulbNb , watts);
        MainActivity.sharedPrefsEditor.commit();
    }

    @JavascriptInterface
    public String getBulbConsumption(String bulbNb) {
        return MainActivity.sharedPrefs.getString("bulbConsumption" + bulbNb , "0");
    }

    @JavascriptInterface
    public String getBulbLife(String bulbNb) {
        return MainActivity.sharedPrefs.getString("bulbLife" + bulbNb , "0");
    }

    @JavascriptInterface
    public void sendBulbLife(String life, String bulbNb) {
        MainActivity.sharedPrefsEditor.putString("bulbLife" + bulbNb , life);
        MainActivity.sharedPrefsEditor.commit();
    }

    @JavascriptInterface
    public void changedBulb(String bublbNB, String atTime) {
        MainActivity.sharedPrefsEditor.putString("bulb" + bublbNB + "OnSince", atTime);
        MainActivity.sharedPrefsEditor.commit();
    }

    @JavascriptInterface
    public String getBulbChangedTime(String bublbNB) {
        return MainActivity.sharedPrefs.getString("bulb" + bublbNB  + "OnSince", "0");
    }

    @JavascriptInterface
    public String getAutoOn() {
        return MainActivity.sharedPrefs.getString("autoON", "0");
    }

  @JavascriptInterface
    public void setAutoOn(String state) {
        MainActivity.sharedPrefsEditor.putString("autoON", state);
        MainActivity.sharedPrefsEditor.commit();

      StringBuilder builder = new StringBuilder();
      builder.append(MainActivity.sharedPrefs.getString("address", "null")).append("\n").append(MainActivity.sharedPrefs.getString("secret", "null")).append("\n").append(MainActivity.sharedPrefs.getString("autoON","1"));
      Log.d("Address,Secret,autoOn: ", builder.toString());
    }

    @JavascriptInterface
    public void vibrate(int time) {

        if (Build.VERSION.SDK_INT >= 26) {
            ((Vibrator) mContext.getSystemService(VIBRATOR_SERVICE)).vibrate(VibrationEffect.createOneShot(time, VibrationEffect.DEFAULT_AMPLITUDE));
        } else {
            ((Vibrator) mContext.getSystemService(VIBRATOR_SERVICE)).vibrate(time);
        }
    }


}
