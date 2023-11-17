const express = require("express");
const mongoDB = require("./db");
const port = 5000;
const app = express();
app.use(express.json());
mongoDB();
app.use("/api/Log",LogRouter);
// app.use("/api/chat", ChatRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});