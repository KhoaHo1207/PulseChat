import authRoute from "./auth.route.js";

const initRoute = (app) => {
  app.use("/api/v1/auth", authRoute);
};

export default initRoute;
