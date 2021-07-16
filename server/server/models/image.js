import mongoose from "mongoose";
import mongoosastic from "mongoosastic";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    tags: [{ type: String }],
    text: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema, "images");
