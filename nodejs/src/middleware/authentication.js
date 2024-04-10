const jwt = require("jsonwebtoken");
const { prisma } = require("../utils");

const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      message: "Access denied. No token provided.",
    });
  }

  try {
    let token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    const findToken = await prisma.token.findUnique({
      where: {
        token,
      },
    });

    if (!findToken) {
      return res.status(401).send({
        message:
          "Invalid token or token was expired/empty, please login again.",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).send({
      message: "Invalid token.",
    });
  }
};

module.exports = authMiddleWare;
