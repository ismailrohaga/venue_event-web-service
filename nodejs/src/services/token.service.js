const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const jwt = require("jsonwebtoken");

class TokenService extends PrismaClient {
  TOKEN_KEY = process.env.JWT_TOKEN_KEY;
  EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;

  constructor() {
    super();
  }

  async storeToken(type, token, userId) {
    await this.token.create({
      data: {
        token,
        userId,
        type,
        expiredAt: moment().add(10, "hours").toDate(),
      },
    });
  }

  async generateAccessToken(user) {
    try {
      const accessToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        this.TOKEN_KEY,
        {
          expiresIn: this.EXPIRES_IN,
        }
      );

      await this.storeToken("ACCESS", accessToken, user.id);

      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TokenService;
