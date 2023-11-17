const { MongoClient } = require("mongodb");
console.log("hi")

const mongoURI ="mongodb+srv://Hemant:Hemant@cluster0.yj0i2fk.mongodb.net/LogInjestor?retryWrites=true&w=majority";
const mongoDB = async () => {
  console.log("working point 1");
  try {
    console.log("inside try block");
    const client = new MongoClient(mongoURI);
    client.connect();
    console.log("Connected to MongoDB");
    // await client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log("point 2");
};

module.exports = mongoDB;
