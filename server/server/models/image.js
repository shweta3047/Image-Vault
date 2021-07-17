import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
const { ObjectId } = mongoose.Schema.Types;

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
    tags: [
      {
        type: ObjectId,
        ref: 'Tag',
        es_indexed: true,
      },
    ],
    text: [{ type: String }],
  },
  { timestamps: true }
);

ImageSchema.plugin(mongoosastic);

const Image = mongoose.model('Image', ImageSchema);

Image.createMapping(function (err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

export default Image;
