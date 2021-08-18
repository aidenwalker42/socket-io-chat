const socket = io.connect();

let form = document.getElementById("form");
let input = document.getElementById("input");
let username = document.getElementById("username");
let typingBox = document.getElementById("typing-box");
let onlineCounter = document.getElementById("oc");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    //if not blank
    let msg = "<h4>" + username.value + ": </h4>" + input.value;
    socket.emit("message", msg);
    socket.emit("typing", false, username.value);
    input.value = ""; //clear
  }
});

input.addEventListener("input", (e) => {
  console.log(e.target.value);
  if (e.target.value !== "") {
    socket.emit("typing", true, username.value);
  } else {
    socket.emit("typing", false, username.value);
  }
});

socket.on("typing", (bool, user) => {
  if (bool) {
    typingBox.innerHTML +=
      "<h6 id='user-" + user + "'>" + user + " is typing...</h6>";
  } else {
    document.getElementById("user-" + user).remove();
  }
});

socket.on("message", (msg) => {
  let item = document.createElement("li");
  item.innerHTML = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight); //scrolls to bottom
});

socket.on("oc", (oc) => {
  onlineCounter.innerHTML = oc;
});
