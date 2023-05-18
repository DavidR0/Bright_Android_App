package net.ddns.int32_t.bright;

import android.service.quicksettings.Tile;
import android.service.quicksettings.TileService;
import android.util.Log;
import android.widget.Toast;

import org.java_websocket.WebSocketFactory;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

public class MyTileService
    extends TileService {

    WebSocketClient ws = null;
    int light = 1;

    public void onClick() {
              // Called when the user click the tile
        if(light == 1){
            ws.send("SetLigh1");
        } else {
            ws.send("SetLigh0");
        }
        ws.send("ReqState");
    }

    public void onStartListening() {
        // Called when the Tile becomes visible

        Tile qsTile;
        //Deactivate Tile by default
        qsTile = getQsTile();
        qsTile.setState(0);
        qsTile.updateTile();


        URI uri = null;

        try {
            uri = new URI( "ws://int32.ddns.net:82" );
            Toast.makeText(getApplicationContext(), "Made uri", Toast.LENGTH_SHORT).show();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        WebSocketClient ws = new WebSocketClient(uri)
        {
            @Override
            public void onMessage( String message ) {
                if(message.equals("Ligh1")){
                    light = 2;
                } else if(message.equals("Ligh0")){
                    light = 1;
                }

                Tile qsTile = getQsTile();
                qsTile.setState(light);
                qsTile.updateTile();
            }

            @Override
            public void onOpen( ServerHandshake handshake ) {
                System.out.println( "opened connection" );
                Toast.makeText(getApplicationContext(), "Made connection", Toast.LENGTH_SHORT).show();
                //Get the current state of the light
                send("ReqState");

            }

            @Override
            public void onClose( int code, String reason, boolean remote ) {
                System.out.println( "closed connection" );
                //Deactivate Tile upon disconnect
                Tile qsTile = getQsTile();
                qsTile.setState(0);
                qsTile.updateTile();
                Toast.makeText(getApplicationContext(), "Closed conn", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onError( Exception ex ) {
                Toast.makeText(getApplicationContext(), "ERRROR", Toast.LENGTH_SHORT).show();
                ex.printStackTrace();
            }

        };
    }

    public void onStopListening() {
        // Called when the tile is no longer visible
        //Disconnect the webSocket
        if (ws != null) {
            ws.close();
            ws = null;
        }
    }

    public void onTileRemoved(){

    }

    public void onTileAdded() {
        // Do something when the user add the Tile

    }
}
