//***********************************Variables***********************************//

currentPage = "Statistics";

//***********************************Function Calls***********************************//

connect();;

//***********************************Parse message***********************************//

function processMessage(data) {

    if(data[0] == 'S' && data[1] == 't' && data[2] == 'a' && data[3] == 't' && data[4] == 's') {
        processStats(data);
    }

    if(data == "Disconect"){
        AndroidInterface.removeDevice();
    }
}

//***********************************Page Modifications***********************************//


//***********************************Page Functionality***********************************//
function processStats(data){

    data = data.replace("Stats","");
    data = data.split('/');

    let totalOnTime = data[0];
    let nbTogglesLights = data[1];
    let TimeSinceReboot = data[2] / 1440; //Get the time in days

    let bulb1Consumption = parseInt(getBulbConsumption(1));
    let bulb2Consumption = parseInt(getBulbConsumption(2));

    let energyConsumption = data[0]/60 * bulb1Consumption + data[0]/60 * bulb2Consumption;

    document.getElementById("totalOnTime").innerText = totalOnTime;
    document.getElementById("nbTogglesLights").innerText = nbTogglesLights;
    document.getElementById("TimesinceReboot").innerText = TimeSinceReboot.toFixed(1);
    document.getElementById("energyConsumption").innerText = energyConsumption.toFixed(1);

//Change to hours from minutes
    if(AndroidInterface.getBulbLife(1) === "0"){
        document.getElementById("bulb1Percentage").innerText = "0%";
        document.getElementById("bulb1Progressbar").value = 0;
    } else {
        let bulb1life = 100 - (100 * parseInt(parseInt(totalOnTime) - parseInt(AndroidInterface.getBulbChangedTime(1)))) / parseInt(AndroidInterface.getBulbLife(1));
        document.getElementById("bulb1Percentage").innerText = bulb1life.toFixed(1) + "%";
        document.getElementById("bulb1Progressbar").value = bulb1life;
    }

    if(AndroidInterface.getBulbLife(2) === "0"){
        document.getElementById("bulb2Percentage").innerText = "0%";
        document.getElementById("bulb2Progressbar").value = 0;
    } else {
        let bulb2life = 100 - (100 * parseInt(parseInt(totalOnTime) - parseInt(AndroidInterface.getBulbChangedTime(2)))) / parseInt(AndroidInterface.getBulbLife(2));
        document.getElementById("bulb2Percentage").innerText = bulb2life.toFixed(1) + "%";
        document.getElementById("bulb2Progressbar").value = bulb2life;
    }
};
