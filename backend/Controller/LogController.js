const asyncHandler = require("express-async-handler");
const LogSchema = require("../Models/log");

const AddLog = asyncHandler(async (req, res, next) => {
    const {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      metadata,
    } = req.body;
  try {
    

    if (
      !level ||
      !message ||
      !resourceId ||
      !timestamp ||
      !traceId ||
      !spanId ||
      !commit 
      ||
      !metadata
    ) {
      res.status(400);
      return next(new Error("Please enter all the details"));
    }

    const LogModel = await LogSchema.create({
      level,
      message,
      resourceId,
      timestamp, // Ensure you have the "timestamp" field in your LogSchema
      traceId,
      spanId,
      commit,
      metadata: {
        parentResourceId: metadata.parentResourceId,
      },
    });

    res.status(201).json({
     
      level: LogModel.level,
      message: LogModel.message,
      resourceId: LogModel.resourceId,
      timestamp: LogModel.timestamp,
      traceId: LogModel.traceId,
      spanId: LogModel.spanId,
      commit: LogModel.commit,
      metadata: {
        parentResourceId: LogModel.metadata.parentResourceId,
      },
    });

    console.log("Success LogModel registered");
  } catch (error) {
    res.status(500);
    return next(new Error("Failed to register"));
  }
});
const AllLogs=asyncHandler(async(req,res)=>{
    const keyword = req.query.search
      ? {
          $or: [
            { level: { $regex: req.query.search, $options: "i" } },
            { message: { $regex: req.query.search, $options: "i" } },
            { resourceId: { $regex: req.query.search, $options: "i" } },
            { timestamp: { $regex: req.query.search, $options: "i" } },
            { traceId: { $regex: req.query.search, $options: "i" } },
            { spanId: { $regex: req.query.search, $options: "i" } },
            { commit: { $regex: req.query.search, $options: "i" } },
            { metadata: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await LogSchema.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.send(users);

})

module.exports = { AddLog, AllLogs };
