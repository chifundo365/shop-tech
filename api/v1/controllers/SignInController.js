import Auth from "../utils/auth.js";
import { Admin, Agent } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Hash from "../utils/hash.js";
import Validate from "../utils/validate.js";

const login = async (req, res, next) => {
  try {
    const missing = Validate.requiredFields(req.body, [
      "email",
      "password",
      "role"
    ]);

    if (Object.keys(missing).length) {
      return next({ type: "VALIDATION_ERROR", details: missing });
    }

    const { email, password, role } = req.body;

    let user;

    if (role == "admin") {
      user = await Admin.findOne({ where: { email } });
    } else {
      user = await Agent.findOne({ where: { email } });
    }

    if (!user) {
      return next({ status: 404, message: "No user with that email found" });
    }

    const validUser = await Hash.compare(password, user.password);

    if (!validUser) {
      return next({
        status: 401,
        message: "Invalid credentials",
        details: { password: "wrong password" }
      });
    }

    const accessToken = Auth.generateAccessToken({
      id: user.id,
      email: user.email,
      role
    });

    const refreshToken = Auth.generateRefreshToken({
      id: user.id,
      email: user.email,
      role
    });

    return res.json(
      AppResponse.AppSuccess(200, "token generated successfully", {
        accessToken,
        refreshToken
      })
    );
  } catch (error) {
    console.error(error);
    return next({
      type: "SERVER_ERROR",
      message: error.message
    });
  }
};

export default login;
