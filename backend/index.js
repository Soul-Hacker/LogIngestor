const express = require("express");
const mongoDB = require("./db");
const LogRouter = require("./Routes/LogRoutes");
const port = 5000;
const app = express();
app.use(express.json());
mongoDB();
app.use("/api/Log",LogRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});