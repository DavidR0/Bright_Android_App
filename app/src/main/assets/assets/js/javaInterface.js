    //Sending Toast Message to Android
    function sendToastMessage(toast) {
        AndroidInterface.sendToastMessage(toast);
    }

    //Sending secret to Android
    function sendSecret(secret) {
         AndroidInterface.sendSecret(secret);
    }

    //Sending address to Android
    function sendAddress(address) {
         AndroidInterface.sendAddress(address);
    }

    //Get bulb Consumption from Android
    function getBulbConsumption(BulbNumber) {
        return AndroidInterface.getBulbConsumption(BulbNumber);
    }