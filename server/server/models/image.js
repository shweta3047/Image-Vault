import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ImageSchema = new mongoose.Schema(
  {
    person: {
      type: ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    tags: [String],
    words: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema);
