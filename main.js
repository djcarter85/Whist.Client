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
        updateGameState(json.body.game);
        break;
      case "gameJoined":
        appendMessage("Game joined. Game ID: " + json.body.game.id + ".");
        updateGameState(json.body.game);
        break;
      case "gameStarted":
        appendMessage("Game started. Game ID: " + json.body.game.id + ".");
        updateGameState(json.body.game);
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

function startGame() {
  console.log("***START GAME");
  var msg = {
    gameType: "whist",
    operation: "startGame",
    playerId: playerId,
    parameters: {
      gameId: document.getElementById("gameIdText").value
    }
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

function updateGameState(game) {
  var gameStateDiv = document.getElementById("gameState");
  gameStateDiv.innerHTML = "";

  var playersList = document.createElement("ul");
  gameStateDiv.appendChild(playersList);

  game.players.forEach(p => {
    var playerItem = document.createElement("li");
    playersList.appendChild(playerItem);

    playerItem.appendChild(document.createTextNode("Player ID " + p.id));

    var cardsList = document.createElement("ul");
    playerItem.appendChild(cardsList);

    p.cards.forEach(c => {
      var cardItem = document.createElement("li");
      cardsList.appendChild(cardItem);

      cardItem.appendChild(document.createTextNode(getSuit(c) + " " + getRank(c)));
    });
  });
}

function getSuit(card) {
  switch (card.suit) {
    case "clubs":
      return "♣";
    case "diamonds":
      return "♦";
    case "hearts":
      return "♥";
    case "spades":
      return "♠";
  }

  return null;
}

function getRank(card) {
  switch (card.rank) {
    case "ace":
      return "A";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
    case "ten":
      return "10";
    case "jack":
      return "J";
    case "queen":
      return "Q";
    case "king":
      return "K";
  }

  return null;
}
