"use strict";
var connection = null;

function connect() {
  var serverUrl = "wss://r0o98hefw6.execute-api.eu-west-2.amazonaws.com/Prod";

  connection = new WebSocket(serverUrl);
  console.log("***CREATED WEBSOCKET");

  connection.onopen = function (evt) {
    console.log("***ONOPEN");
  };
  console.log("***CREATED ONOPEN");

  connection.onmessage = function (evt) {
    console.log("***ONMESSAGE");

    var json = JSON.parse(evt.data);

    console.log("Message received: ");
    console.log(json);

    var messageType = json.messageType;

    switch (messageType) {
      case "gameCreated":
        appendMessage("Game created. Game ID: " + json.game.id + ".");
        break;
      case "gameJoined":
        appendMessage("Game joined. Game ID: " + json.game.id + ".");
        break;
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
  console.log("***CREATE GAME");
  var msg = {
    gameType: "whist",
    operation: "createGame"
  };
  connection.send(JSON.stringify(msg));
}

function joinGame() {
  console.log("***JOIN GAME");
  var msg = {
    gameType: "whist",
    operation: "joinGame",
    parameters: {
      gameId: document.getElementById("gameIdText").value
    }
  };
  connection.send(JSON.stringify(msg));
}
