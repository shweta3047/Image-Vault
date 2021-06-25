import User from "../../models/user";
import Images from "../../models/image";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { Image, createCanvas } from "canvas";

export class ImageService {
  ImageService() {
    var newImage = nulll;
  }
  async upload(url, mode, user) {
    try {
      if (!user) {
        throw { message: "User must be logged in" };
      }
      if (!url || !mode) {
        throw { message: "Fill all the fields!" };
      }
      console.log("Using TensorFlow backend: ", tf.getBackend());

      await this.loadImage();
      return this.newImage;
      // console.log("newimage", newImage);
      // if (newImage) {
      //   console.log("returning new image");
      //   return newImage;
      // }
    } catch (error) {
      throw error;
    }
  }

  loadImage = async () => {
    const model = await mobilenet.load();

    const width = 300;
    const height = 300;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    let tags = [];
    let newImage = null;
    img.src = url;

    img.onload = async () => {
      console.log("image loaded.");

      ctx.drawImage(img, 0, 0, width, height);

      // classify
      const predictions = await model.classify(canvas);
      let newTags;
      predictions.forEach((tag) => {
        newTags = tag.className.split(",");
        newTags.forEach((tag) => {
          tags.push(tag);
        });
      });
      console.log(tags);
      newImage = await Images.create({
        user: user._id,
        url,
        mode,
        tags,
      });
    };
    img.onerror = (err) => {
      throw err;
    };
  };
}

export default new ImageService();
