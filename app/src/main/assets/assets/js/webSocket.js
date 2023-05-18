
let connection;
let currentPage = false;

//Making the WebSocket connection with address that we get from the android part of the webApp
function connect(){

    //Disconnect from the old connection
    if(connection !== undefined) {
        connection.close();
        console.log("Closed Websocket Connection");
    }

    connection = new WebSocket('ws://' + AndroidInterface.getAddress() + ':82/', ['arduino']);

    connection.onopen = function () {
         connection.send('Connect ' + new Date());


         if(currentPage === "Home") {
            hideReconnectBar();
            connection.send("ReqState");//Get initial data
         } else if(currentPage === "Statistics") {
            connection.send("ReqStats");//Get initial data
         }
    };

    connection.onerror = function (error) {
        console.log('WebSocket Error ', error);
        connection.close();
    };

    connection.onmessage = function (e) {
        console.log('Server: ', e.data);
        processMessage(e.data);
    };

    connection.onclose = function () {
        console.log('WebSocket connection closed');

        if(currentPage === "Home") {
            showReconnectBar()
        }

    };
}

//Try to connect to see if webSocket is valid and replace current connection with the new one
/*
    When calling the function a link can be provided to redirect to when the connection is successful.
    If no redirection is wanted : tryToConnect(secret, address, "false");
*/
function tryToConnect(secret, address, redirect) {

    let newConnection = new WebSocket('ws://' + address + ':82/', ['arduino']);
    sendToastMessage("Connecting Please wait!...");

    newConnection.onopen = function () {

        //Disconnect from the old connection
         if(typeof(connection) !== "undefined") {
             connection.close();
             console.log("Closed Websocket Connection");
         }

        //Change the current connection to the newly one made
        connection = newConnection

        //Save the new connection
        sendSecret(secret);
        sendAddress(address);

        sendToastMessage("Successful connected to new address!");

        if(redirect !== "false") {
            window.location.replace(redirect);
        } else {

            if(currentPage === "Settings") {
                emptyConnectionForm();
            }
            getPageData();
        }
    };

    newConnection.onerror = function (error) {
        console.log('WebSocket Error ', error);
        sendToastMessage("Failed to connect!\nDouble check your Secret & Address");
    };

    newConnection.onmessage = function (e) {
        console.log('Server: ', e.data);
    };

    newConnection.onclose = function () {
        console.log('WebSocket connection closed');
    };
}