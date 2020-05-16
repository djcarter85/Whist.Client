"use strict";
var connection = null;
var playerId = null;

function connect() {
  var serverUrl = "wss://88gjrw5klc.execute-api.eu-west-2.amazonaws.com/Prod";

  connection = new WebSocket(serverUrl);
  console.log("***CREATED WEBSOCKET");

  connection.onopen = function (evt) {
    console.log("***ONOPEN");
    createPlayer();
  };
  console.log("***CREATED ONOPEN");

  connection.onmessage = function (evt) {
    console.log("***ONMESSAGE");

    var json = JSON.parse(evt.data);

    console.log("Message received: ");
    console.log(json);

    var messageType = json.messageType;

    switch (messageType) {
      case "playerCreated":
        playerId = json.body.playerId;
        appendMessage("Player created. Player ID: " + json.body.playerId + ".");
        break;
      case "gameCreated":
        appendMessage("Game created. Game ID: " + json.body.game.id + ".");
        break;
      case "gameJoined":
        appendMessage("Game joined. Game ID: " + json.body.game.id + ".");
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

function createPlayer() {
  console.log("***CREATE PLAYER");
  var msg = {
    gameType: "whist",
    operation: "createPlayer"
  };
  connection.send(JSON.stringify(msg));
}

function createGame() {
  console.log("***CREATE GAME");
  var msg = {
    gameType: "whist",
    operation: "createGame",
    playerId: playerId
  };
  connection.send(JSON.stringify(msg));
}

function joinGame() {
  console.log("***JOIN GAME");
  var msg = {
    gameType: "whist",
    operation: "joinGame",
    playerId: playerId,
    parameters: {
      gameId: document.getElementById("gameIdText").value
    }
  };
  connection.send(JSON.stringify(msg));
}
