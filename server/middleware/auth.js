import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const customToken = token?.length < 500;
    let decoded;

    if (!token) {
      console.log("Invalid authorization");
      return res.status(401).json({ error: "Unauthorized" });
    } else if (token && customToken) {
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
};
export default auth;
