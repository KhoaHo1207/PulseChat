import { Server } from "socket.io";

export const userSocketMap = {};

let ioInstance;

const getOnlineUsers = () => Object.keys(userSocketMap);

const attachConnectionHandlers = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected:", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", getOnlineUsers());

    socket.on("disconnect", () => {
      console.log("User disconnected:", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", getOnlineUsers());
    });
  });
};

export const initRealtimeServer = (httpServer) => {
  if (!httpServer) {
    throw new Error("HTTP server instance is required to initialize socket.io");
  }

  if (ioInstance) {
    return ioInstance;
  }

  ioInstance = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  attachConnectionHandlers(ioInstance);

  return ioInstance;
};

export const getRealtimeServer = () => {
  if (!ioInstance) {
    throw new Error("Realtime server has not been initialized yet");
  }

  return ioInstance;
};
