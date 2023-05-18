//***********************************Variables***********************************//

let softVibrate = 50;
let mildVibrate = 100;
let strongVibrate = 150;

currentPage ="Settings";

let bulbChangedAt = 0;
let bulbToChange = 0;

//***********************************Function Calls***********************************//

connect();
getPageData();

//***********************************Parse message***********************************//

function processMessage(data) {
    if(data === "RebootOK") {
        sendToastMessage("Rebooting");
    }

     if(data[0] == 'S' && data[1] == 't' && data[2] == 'a' && data[3] == 't' && data[4] == 's') {
         data = data.replace("Stats","");
         data = data.split('/');
         bulbChangedAt = data[0];
         AndroidInterface.changedBulb(bulbToChange,bulbChangedAt);
         bulbToChange = 0;
     }
}

//***********************************Page Modifications***********************************//

function getPageData() {

    let Bulb1Consumption = AndroidInterface.getBulbConsumption("1");
    let Bulb2Consumption =  AndroidInterface.getBulbConsumption("2");

    let Bulb1Life = AndroidInterface.getBulbLife("1");
    let Bulb2Life = AndroidInterface.getBulbLife("2");

    let address = AndroidInterface.getAddress();

    document.getElementById('Bulb1ConsumptionForm').placeholder = "Consumption (Currently set at : " + Bulb1Consumption + " Watts )";
    document.getElementById('Bulb1LifeForm').placeholder = "Life (Currently set at : " + Bulb1Life + " )";

    document.getElementById('Bulb2ConsumptionForm').placeholder = "Consumption (Currently set at : " + Bulb2Consumption + " Watts )";
    document.getElementById('Bulb2LifeForm').placeholder = "Life (Currently set at : " + Bulb2Life + " )";

    document.getElementById('addressForm').placeholder = "IP/Address (Currently set at : " + address + " )";
    document.getElementById('secretForm').placeholder = "Secret";
}

function emptyConnectionForm() {
     document.getElementById('addressForm').value = "";
     document.getElementById('secretForm').value = "";
}

//***********************************Page Functionality***********************************//

document.getElementById("light1SetBtn").addEventListener("click", ()=> {
    if(document.getElementById('Bulb1ConsumptionForm').value === "" || document.getElementById('Bulb1LifeForm').value === "") {
        sendToastMessage("Field cannot be empty !");
    } else {
        AndroidInterface.sendBulbConsumption(document.getElementById('Bulb1ConsumptionForm').value,1);
        AndroidInterface.sendBulbLife(document.getElementById('Bulb1LifeForm').value,1)
        //Must empty form so that the placeholder can take place
        document.getElementById('Bulb1ConsumptionForm').value = "";
        document.getElementById('Bulb1LifeForm').value = ""

        AndroidInterface.vibrate(softVibrate);
        getPageData();
    }

});

document.getElementById("light2SetBtn").addEventListener("click", ()=> {
    if(document.getElementById('Bulb2ConsumptionForm').value === "" || document.getElementById('Bulb2LifeForm').value === "") {
         sendToastMessage("Field cannot be empty !");
    } else {
        AndroidInterface.sendBulbConsumption(document.getElementById('Bulb2ConsumptionForm').value,2);
        AndroidInterface.sendBulbLife(document.getElementById('Bulb2LifeForm').value,2)
        //Must empty form so that the placeholder can take place
        document.getElementById('Bulb2ConsumptionForm').value = "";
        document.getElementById('Bulb2LifeForm').value = ""

        AndroidInterface.vibrate(softVibrate);
        getPageData();
    }
});

document.getElementById("changeConnectionBtn").addEventListener("click", ()=> {
    let secret = document.getElementById('secretForm').value;
    let address = document.getElementById('addressForm').value;

    if(secret === "" || address === "") {
        sendToastMessage("Field's cannot be empty !");
    } else {
        console.log(address);
        tryToConnect(secret, address, "false");
    }
});

document.getElementById("resetBulbLife1Btn").addEventListener("click", ()=> {
    connection.send("ReqStats");
    bulbToChange = 1;
    AndroidInterface.vibrate(mildVibrate);
});

document.getElementById("resetBulbLife2Btn").addEventListener("click", ()=> {
    connection.send("ReqStats");
    bulbToChange = 2;
    AndroidInterface.vibrate(mildVibrate);
});

document.getElementById("autoOnBtn").addEventListener("click", ()=> {
    AndroidInterface.vibrate(softVibrate);

    let state = AndroidInterface.getAutoOn();

    if(state == 1 ) {
        AndroidInterface.setAutoOn("0");
        AndroidInterface.sendToastMessage("Off");
    } else {
        AndroidInterface.setAutoOn("1");
        AndroidInterface.sendToastMessage("On");
    }
});



//***********************************Disable Enter***********************************//

 $('form input').on('keypress', function(e) {
     return e.which !== 13;
 });