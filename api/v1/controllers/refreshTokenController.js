import Auth from "../utils/auth.js";
import redisService from "../utils/redis.js";
import AppResponse from "../utils/appResponse.js";

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      next({ status: 400, message: "Refresh token is required" });
    } else {
      const user = Auth.verifyRefreshToken(refreshToken);

      if (!user) {
        next({ status: 403, message: "Invalid refresh token" });
      } else {
        if (!await redisService.getRefreshToken(user.id)) {
          next({ status: 403, message: "Invalid refresh token" });
        } else {
          const accessToken = Auth.generateAccessToken(user);
          AppResponse.AppSuccess(200, "Token refreshed successfully", {
            accessToken
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export default refreshToken;
