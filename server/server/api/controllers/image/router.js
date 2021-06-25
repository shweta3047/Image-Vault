import * as express from "express";
import controller from "./controller";
import isLoggedIn from "../../middlewares/isLoggedIn";

export default express.Router().post("/upload", isLoggedIn, controller.upload);
//   .post("/signup", controller.signup);
