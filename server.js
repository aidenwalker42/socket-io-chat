// const http = require("http").createServer();

// const io = require("socket.io")(http, {
//   cors: { origin: "*" },
// });

// "use strict";
// const express = require("express");
// const socketIO = require("socket.io");

// const PORT = process.env.PORT || 3000;
// const INDEX = "/index.html";

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = socketIO(server);

const express = require("express");
const app = express();
app.use(express.static("public"));
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
const port = process.env.PORT || 5500;
server.listen(port, () => {
  console.log(port + " running");
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });

  let type = true;
  socket.on("typing", (bool, user) => {
    if (bool) {
      if (type) {
        console.log(user + " is typing");
        io.emit("typing", true, user);
        type = false;
      }
    } else {
      console.log("user stopped typing");
      io.emit("typing", false, user);
      type = true;
    }
  });
});

// http.listen(3000, () => console.log("server running 3000"));
