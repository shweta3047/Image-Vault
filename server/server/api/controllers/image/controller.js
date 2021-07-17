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
  async search(req, res) {
    try {
      const { mode, tags } = req.query;
      if (mode == 'public') {
        const images = await ImageService.searchPublic(tags);
        res.send({
          status: 200,
          images: images,
          message: 'Successfully searched public images',
        });
      } else {
        const images = await ImageService.searchPrivate(req.user._id, tags);
        res.send({
          status: 200,
          images: images,
          message: 'Successfully searched private images',
        });
      }
    } catch (error) {
      res.send({
        status: error.status || '500',
        message: error.message || 'Something Went Wrong',
      });
    }
  }
}

export default new Controller();
