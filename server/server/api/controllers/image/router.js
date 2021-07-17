import * as express from 'express';
import controller from './controller';
import isLoggedIn from '../../middlewares/isLoggedIn';
import checkMode from '../../middlewares/checkMode';

export default express
  .Router()
  .post('/upload', isLoggedIn, controller.upload)
  .post('/search', isLoggedIn, controller.searchPrivate)
  .post('/search/:mode', controller.searchPublic)
  .get('/', checkMode, controller.check);

// search images based on tags
// search private images for particular user
