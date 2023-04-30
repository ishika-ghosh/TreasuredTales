import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const customToken = token?.length < 500;
      let decoded;

      if (token && customToken) {
        decoded = jwt.verify(token, "test", (err, res) => {
          if (err) {
            return "token expired";
          }
          return res;
        });
        if (decoded == "token expired") {
          return res.status(401).json({ error: decoded });
        }
        req.userId = decoded?.id;
      } else {
        decoded = jwt.decode(token);
        req.userId = decoded.sub;
      }

      next();
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Invalid authorization");
    return res.status(401).json({ error: "Unauthorized" });
  }
};
export default auth;
