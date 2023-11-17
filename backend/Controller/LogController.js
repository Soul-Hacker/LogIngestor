const asyncHandler = require("express-async-handler");
const LogSchema = require("../Models/log");

const AddLog = asyncHandler(async (req, res, next) => {
  try {
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

    if (
      !level ||
      !message ||
      !resourceId ||
      !timestamp ||
      !traceId ||
      !spanId ||
      !commit ||
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
      _id: LogModel._id,
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

module.exports = { AddLog };
