import mongoose from "mongoose";
const CodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true
  }
);

export const CodeModel = mongoose.model("userCode", CodeSchema);