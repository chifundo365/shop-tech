import Auth from "../utils/auth.js";

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json("Missing refresh token ");
    } else {
      const user = Auth.verifyRefreshToken(refreshToken);

      if (!user) {
        res.status(403).json("invalid refresh token");
      } else {
        res
          .status(200)
          .json(
            Auth.generateAccessToken({
              id: user.id,
              email: user.email,
              role: user.role
            })
          );
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export default refreshToken;
