//***********************************Variables***********************************//

//***********************************Function Calls***********************************//

//***********************************Parse message***********************************//

//***********************************Page Modifications***********************************//

//***********************************Page Functionality***********************************//

document.getElementById("connectBtn").addEventListener("click", ()=> {

    let secret = document.getElementById("secret").value;
    let address = document.getElementById("address").value;
    let redirect = "index.html";

    if(secret === "" || address === "" ){
        sendToastMessage("Input fields cannot be empty!");
    } else {
        tryToConnect(secret, address, redirect);
    }
});

//***********************************Disable Enter***********************************//

 $('form input').on('keypress', function(e) {
     return e.which !== 13;
 });