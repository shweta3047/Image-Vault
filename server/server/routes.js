import authRouter from "./api/controllers/auth/router";
import imageRouter from "./api/controllers/image/router";

export default function routes(app) {
  app.use("/auth", authRouter);
  app.use("/image", imageRouter);
}
