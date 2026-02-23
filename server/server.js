import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./lib/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(
  express.json({
    limit: "4mb",
  })
);
app.use(express.urlencoded({ extended: true }));

ConnectDB();

app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
