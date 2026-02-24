import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./lib/db.js";
import initRoute from "./routes/index.route.js";
import { initRealtimeServer } from "./socket/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

initRealtimeServer(server);
app.use(cors());
app.use(
  express.json({
    limit: "4mb",
  })
);
app.use(express.urlencoded({ extended: true }));

ConnectDB();
initRoute(app);

app.get("/", (req, res) => {
  return res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
