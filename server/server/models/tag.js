import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
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
        ref: 'Image',
        es_indexed: true,
      },
    ],
  },
  { timestamps: true }
);
TagSchema.plugin(mongoosastic);

const Tag = mongoose.model('Tag', TagSchema);

Tag.createMapping(function (err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

export default Tag;
