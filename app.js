const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());

// MongoDB와의 연결 설정

const MONGODB_ID = "kimsuhyun";
const MONGODB_PASSWORD = "suhyun90%40";
const MONGODB_ENDPOINT = "cluster0.n3gcvs0.mongodb.net";
const MONGODB_DB = "practice";

mongoose
  .connect(
    `mongodb+srv://${MONGODB_ID}:${MONGODB_PASSWORD}@${MONGODB_ENDPOINT}/${MONGODB_DB}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// user 라우터 등록
const userRouter = require("./src/user/userRouter");
app.use("/users", userRouter);

// product 라우터 등록
const productRouter = require("./src/product/productRouter");
app.use("/products", productRouter);

// category 라우터 등록
const categoryRouter = require("./src/category/categoryRouter");
app.use("/category", categoryRouter);

// order 라우터 등록
const orderRouter = require("./src/order/orderRouter");
app.use("/order", orderRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
