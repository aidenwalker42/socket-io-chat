const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
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

http.listen(3000, () => console.log("server running 3000"));
