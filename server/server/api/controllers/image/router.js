import * as express from "express";
import controller from "./controller";
import isLoggedIn from "../../middlewares/isLoggedIn";

export default express
  .Router()
  .post("/upload", isLoggedIn, controller.upload)
  .post("/search/private", isLoggedIn, controller.searchPrivate)
  .post("/search/public", controller.searchPublic);

// search images based on tags
// search private images for particular user
