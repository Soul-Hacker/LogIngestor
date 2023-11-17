const asyncHandler = require("express-async-handler");
const LogSchema = require("../Models/log");
const AddLog=asyncHandler(async(req,res)=>{
  const {
    level,
    message,
    resourceId,
    traceId,
    spanId,
    commit,
    metadata,
    parentResourceId,
  } = req.body;
  if (!level||
    !message||
   ! resourceId||
    !traceId||
   ! spanId||
    !commit||
    !metadata||
    !parentResourceId) {
    res.status(400);
    return next(new Error("Please enter all the details"));
  }
  try {
    const LogModel = await LogSchema.create({
      level,
      message,
      resourceId,
      traceId,
      spanId,
      commit,
      metadata,
      parentResourceId,
    });

    res.status(201).json({
      _id: LogModel._id,
      level: LogModel.level,
      message: LogModel.message,
      resourceId: LogModel.resourceId,
      traceId: LogModel.traceId,
      spanId: LogModel.spanId,
      commit: LogModel.commit,
      metadata: LogModel.metadata,
      parentResourceId: LogModel.parentResourceId,
    });
    console.log("Success LogModel registered")
}
catch(e)
{
    res.status(500);
    return next(new Error("Failed to register"));
    
}

}

)

module.exports = { AddLog };
