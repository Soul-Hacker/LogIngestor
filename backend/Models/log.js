const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    resourceId: {
      type: String,
      required: true,
    },
    timestamp:{
      type:String,required:true
    },
    traceId: {
      type: String,
      required: true,
    },
    spanId: {
      type: String,
      required: true,
    },
    commit: {
      type: String,
      required: true,
    },
    metadata: {
      parentResourceId: {
        type: String,
        required: true
      }
    }
  }
  
);
async function run() {
  console.log("running point 1");
  await mongoose.connect(
    "mongodb+srv://Hemant:Hemant@cluster0.yj0i2fk.mongodb.net/LogInjestor?retryWrites=true&w=majority"
  );
}
run();
const LogSchema = mongoose.model("Logs", logSchema);
module.exports = LogSchema;