import isLoggedIn from '../middlewares/isLoggedIn';

module.exports = (req, res, next) => {
  try {
    mode = req.params.mode;
    if (mode == 'public') {
      next();
    } else if (mode == 'private') {
      isLoggedIn(req, res, next);
    } else {
      throw { message: 'invalid mode' };
    }
  } catch (error) {
    return res.status(error.status || 500).json({
      status: error.status || '500',
      message: error.message || 'Something Went Wrong',
    });
  }
};
