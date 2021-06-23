import authRouter from "./api/controllers/auth/router";

export default function routes(app) {
  app.use("/auth", authRouter);
}
