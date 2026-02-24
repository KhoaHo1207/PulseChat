import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";

const initRoute = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/user", userRoute);
};

export default initRoute;
