import mongoose from "mongoose";

const environmentSchema = new mongoose.Schema({
  name: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  apiKey: String,
  data: {
    type: Map,
    of: new mongoose.Schema(
      {
        value: mongoose.Schema.Types.Mixed,
        status: { type: String, enum: ["active", "inactive"], default: "active" }
      },
      { _id: false }
    ),
    default: {} 
  }
});

export default mongoose.model("Environment", environmentSchema);
