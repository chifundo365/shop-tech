import Auth from "../utils/auth.js";
import { Admin, Agent } from "../models/index.js";
import AppResponse from "../utils/appResponse.js";
import Hash from "../utils/hash.js";

const login = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role == "admin") {
      user = await Admin.findOne({ where: { email } });
    } else {
      user = await Agent.findOne({ where: { email } });
    }

    console.log(user);

    if (!user) {
      return res
        .status(401)
        .json(
          AppResponse.AppError(
            "UNAUTHORIZED",
            401,
            "Invalid Credentials",
            "UNAUTHORIZED_ERROR",
            { email: "no user with the given email found" }
          )
        );
    }

    const validUser = await Hash.compare(password, user.password);

    console.log(validUser);

    if (!validUser) {
      return res
        .status(401)
        .json(
          AppResponse.AppError(
            "UNAUTHORIZED",
            401,
            "Wrong password",
            "UNAUTHORIZED_ERROR",
            { password: "Wrong password!" }
          )
        );
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

    res.json(
      AppResponse.AppSuccess(200, "token generated successfully", {
        accessToken,
        refreshToken
      })
    );
  } catch (error) {
    console.error(error);
    next({
      type: "SERVER_ERROR",
      message: error
    });
  }
};

export default login;
