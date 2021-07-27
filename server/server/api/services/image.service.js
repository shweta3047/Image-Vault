// import User from '../../models/user';
import Images from '../../models/image';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
// import Tesseract from "tesseract.js";

import { loadImage, createCanvas } from 'canvas';

export class ImageService {
  async upload(url, mode, user) {
    try {
      if (!user) {
        throw { message: 'User must be logged in' };
      }
      if (!url || !mode) {
        throw { message: 'Fill all the fields!' };
      }
      console.log('Using TensorFlow backend: ', tf.getBackend());

      const model = await mobilenet.load();

      const width = 300;
      const height = 300;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      const img = await loadImage(url);
      ctx.drawImage(img, 0, 0, width, height);
      const predictions = await model.classify(canvas);
      // console.log(predictions);
      let newTags = [];
      predictions.forEach((tag) => {
        newTags = [...newTags, ...tag.className.split(',')];
      });

      // const words = await Tesseract.recognize(url, "eng", {
      //   // logger: (m) => console.log(m),
      // });
      // console.log(words.data.text);

      const image = await Images.create({
        user: user._id,
        url,
        mode,
        tags: newTags,
      });

      return image;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async searchPublic(tags) {
    tags = tags.split('_');
  }

  async searchPublic(userId, tags) {
    tags = tags.split('_');
  }
}

export default new ImageService();
