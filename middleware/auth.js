import Auth from "../utils/auth.js";

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : null;

  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = Auth.verifyAccessToken(token);
    if (!decoded) {
      throw new Error("invalid token");
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export { authenticateJWT };
