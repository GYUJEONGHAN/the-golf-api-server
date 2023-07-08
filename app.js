const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/User/userModel");
const Admin = require("./src/Admin/adminModel");

const MONGODB_ID = "kimsuhyun";
const MONGODB_PASSWORD = "suhyun90%40";
const MONGODB_ENDPOINT = "cluster0.n3gcvs0.mongodb.net";
const MONGODB_DB = "practice";

const app = express();
const port = 4567;

app.use(express.json());
const userRouter = require("./src/User/userRouter");
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 웹, 컨트롤러, 라우터
// MongoDB와의 연결 설정

mongoose
  .connect(
    `mongodb+srv://${MONGODB_ID}:${MONGODB_PASSWORD}@${MONGODB_ENDPOINT}/${MONGODB_DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행되었습니다.`);
});
