"use strict";
var connection = null;

function connect() {
  var serverUrl = "wss://9h1asw71ze.execute-api.eu-west-2.amazonaws.com/Prod";

  connection = new WebSocket(serverUrl);
  console.log("***CREATED WEBSOCKET");

  connection.onopen = function (evt) {
    console.log("***ONOPEN");
    document.getElementById("connectButton").disabled = true;
    document.getElementById("text").disabled = false;
    document.getElementById("sendButton").disabled = false;
  };
  console.log("***CREATED ONOPEN");

  connection.onmessage = function (evt) {
    console.log("***ONMESSAGE");
    var text = evt.data;
    console.log("Message received: ");
    console.dir(text);

    if (text.length) {
      var messagesList = document.getElementById("messagesList");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(text));
      messagesList.appendChild(li);
    }
  };
  console.log("***CREATED ONMESSAGE");
}

function send() {
  console.log("***SEND");
  var msg = {
    data: document.getElementById("text").value,
    message: "sendmessage"
  };
  connection.send(JSON.stringify(msg));
  document.getElementById("text").value = "";
}

function handleKey(evt) {
  if (evt.keyCode === 13 || evt.keyCode === 14) {
    if (!document.getElementById("sendButton").disabled) {
      send();
    }
  }
}
