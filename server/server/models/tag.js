import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: ObjectId,
        ref: "Image",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tag", TagSchema);
