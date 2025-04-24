// Store room data
let rooms = {}; // Stores { roomID: { code, cursors } }

const socketHandel = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on("joinRoom", ({roomID , name}) => {
      socket.join(roomID);
      console.log(`User ${socket.id} joined room: ${roomID}`);

      if (!rooms[roomID]) {
        rooms[roomID] = { code: "", cursors: {} };
      }
      socket.emit("init", rooms[roomID]);

      socket.to(roomID).emit("userJoined", {id:socket.id , name});
    });

    // Code changes
    socket.on("codeChange", ({ roomID, code , name }) => {
      try {
        if (rooms[roomID]) {
          rooms[roomID].code = code;
          socket.to(roomID).emit("codeChange", {newCode:code , name:name});
        }
      } catch (error) {
        socket.emit("errorMessage", { message: error.message, error: 1 });
      }
    });

    // Cursor movements
    socket.on("cursorMove", ({ roomID, cursor }) => {
      try {
        if (rooms[roomID]) {
          rooms[roomID].cursors[socket.id] = cursor;

          console.log(rooms[roomID].cursors)
          console.log(`Cursor updated for ${socket.id}:`, cursor); // Debug log
          socket.to(roomID).emit("cursorMove", { id: socket.id, cursor });
        }
      } catch (error) {
        socket.emit("errorMessage", { message: error.message, error: 1 });
      }
    });

    // User disconnects
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      for (let roomID in rooms) {
        if (rooms[roomID].cursors[socket.id]) {
          delete rooms[roomID].cursors[socket.id];
          io.to(roomID).emit("removeCursor", socket.id);
        }
      }
    });

    socket.on("joinRoom", (roomName) => {
      console.log(roomName);
      socket.join(roomName);
      console.log(`A user joined room: ${roomName}`);
      socket.emit("message", `Welcome to the room!${roomName}`);
    });
    
    socket.on("sending-message", (message) => {
      console.log("triggerereeee")
      console.log("Received message from client:", message.chatMessage);
      console.log("name of  client:", message.userName);
      socket.broadcast.emit("new-message-to-all", message);
      // if (callback) {
      //   callback("Message received successfully");
      // }
    });
  });
};

export default socketHandel;