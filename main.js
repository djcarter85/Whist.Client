"use strict";
var connection = null;

function connect() {
  var serverUrl = "wss://r0o98hefw6.execute-api.eu-west-2.amazonaws.com/Prod";

  connection = new WebSocket(serverUrl);
  console.log("***CREATED WEBSOCKET");

  connection.onopen = function (evt) {
    console.log("***ONOPEN");
    document.getElementById("connectButton").disabled = true;
    document.getElementById("createGameButton").disabled = false;
  };
  console.log("***CREATED ONOPEN");

  connection.onmessage = function (evt) {
    console.log("***ONMESSAGE");

    var json = JSON.parse(evt.data);

    console.log("Message received: ");
    console.log(json);

    var messageType = json.messageType;

    if (messageType == "gameCreated") {
      appendMessage("Game created. Game ID: " + json.game.id + ".");
    }
  };
  console.log("***CREATED ONMESSAGE");
}

function appendMessage(text) {
  var messagesList = document.getElementById("messagesList");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(text));
  messagesList.appendChild(li);
}

function createGame() {
  console.log("***SEND");
  var msg = {
    gameType: "whist",
    operation: "createGame"
  };
  connection.send(JSON.stringify(msg));
}
