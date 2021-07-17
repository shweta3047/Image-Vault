import ImageService from '../../services/image.service';

export class Controller {
  async upload(req, res) {
    try {
      //   console.log(req.user);
      const { url, mode } = req.body;
      const image = await ImageService.upload(url, mode, req.user);

      return res.json({
        status: 200,
        message: 'Successfully uploaded the image!!',
        image,
      });
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong',
      });
    }
  }

  async searchPublic(req, res) {}

  async searchPrivate(req, res) {}

  async check(req, res) {
    mode = req.params.mode;
    if (mode == 'public') {
      res.send({
        status: 200,
        message: 'This is a public request',
      });
    } else {
      res.send({
        status: 200,
        message: 'This is a private request',
        user: req.user,
      });
    }
  }
}

export default new Controller();
