import ImageService from "../../services/image.service";

export class Controller {
  async upload(req, res) {
    try {
      //   console.log(req.user);
      const { url, mode } = req.body;
      const image = await ImageService.upload(url, mode, req.user);
      if (image) {
        return res.json({
          status: 200,
          message: "Successfully uploaded the image!!",
          image,
        });
      } else {
        throw {
          message: "Some error occurred. Try again!!",
        };
      }
    } catch (error) {
      res.send({
        status: error.status || "500",
        message: error.message || "Something Went Wrong",
      });
    }
  }

  async searchPublic(req, res) {}

  async searchPrivate(req, res) {}
}

export default new Controller();
