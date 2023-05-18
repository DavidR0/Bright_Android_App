//***********************************Variables***********************************//
let softVibrate = 50;
let mildVibrate = 100;
let strongVibrate = 150;

currentPage ="Home";

let firstStart = true;
let autoOn =  AndroidInterface.getAutoOn();

//***********************************Function Calls***********************************//

connect();

//***********************************Parse message***********************************//

function processMessage(data) {

    if(data[0] === 'L' && data[1] === 'i' && data[2] === 'g' && data[3] === 'h') {
        if(data[4] === '1') {
            if(autoOn == "1") {
                if(firstStart){
                    connection.send("SetLigh0");
                    firstStart = false;
                }
            }


            changeBackground(true);

        } else {
             if(autoOn == "1") {
                if(firstStart){
                    connection.send("SetLigh1");
                    firstStart = false;
                }
             }

            changeBackground(false);
        }
        (data[4]);
    }

     if(data === "Disconect"){
        AndroidInterface.removeDevice();
     }
};

//***********************************Page Modifications***********************************//

function changeBackground(dark){

    if(dark) {
        $("#indexbackround").fadeTo("slow", 0.50);
    } else {
        $("#indexbackround").fadeTo("slow", 1);
    }
};

//***********************************Page Functionality***********************************//

document.getElementById("lightOnBtn").addEventListener("click", ()=> {

   if(connection.readyState === connection.OPEN){
       AndroidInterface.vibrate(strongVibrate);
       connection.send("SetLigh1");
       connection.send("ReqState");
   }
});

document.getElementById("lightOffBtn").addEventListener("click", ()=> {

    if(connection.readyState === connection.OPEN){
        AndroidInterface.vibrate(strongVibrate);
        connection.send("SetLigh0");
        connection.send("ReqState");
    }
});

document.getElementById("statisticsBtn").addEventListener("click", ()=> {

    window.location.href = "stats.html"
    AndroidInterface.vibrate(softVibrate);
});

document.getElementById("settingsBtn").addEventListener("click", ()=> {

    window.location.href = "settings.html"
    AndroidInterface.vibrate(softVibrate);
});

document.getElementById("reconnectBtn").addEventListener("click", ()=> {

    if(connection.readyState === connection.CLOSED) {
        connect();
        document.getElementById("reconnectBtnText").innerText = "Connecting";
        AndroidInterface.vibrate(mildVibrate);
    }
});

function showReconnectBar() {
    $("#connectionNavBar").fadeTo("slow", 1);
    document.getElementById("reconnectBtnText").innerText = "Reconnect";
}

function hideReconnectBar() {
    $("#connectionNavBar").fadeTo("slow", 0);
}


//***********************************Disable Enter***********************************//

 $('form input').on('keypress', function(e) {
     return e.which !== 13;
 });