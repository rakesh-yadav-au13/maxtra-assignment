import express from "express";
import mongoInit from "./models/config/mongoConfig";

require("dotenv").config();

const app = express();
const Port = process.env.PORT || 4001;
mongoInit();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("Health Okey");
});

import authRouter from "./routes/auth";

app.use("/api", authRouter);

app.listen(Port, () => {
  console.log(`app running on Port: http://localhost:${Port}`);
});
