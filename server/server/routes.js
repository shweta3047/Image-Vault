import authRouter from "./api/controllers/auth/router";

export default function routes(app) {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/auth", authRouter);
}
