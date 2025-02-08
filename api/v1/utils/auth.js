import jwt from "jsonwebtoken";

class Auth {
  static generateAccessToken(user) {
    try {
      return jwt.sign(user, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: "2h"
      });
    } catch (error) {
      console.error("Error Generating Access Token", error);
      return null;
    }
  }

  static generateRefreshToken(user) {
    try {
      return jwt.sign(user, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: "14d"
      });
    } catch (error) {
      console.error("Error generating refresh token:", error);
      return null;
    }
  }
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }
}

export default Auth;
