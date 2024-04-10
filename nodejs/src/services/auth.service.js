const { PrismaClient } = require("@prisma/client");
const {
  createCryptoHashedPassword,
  compareCryptoHashedPassword,
} = require("../utils/crypto");

class AuthService extends PrismaClient {
  constructor() {
    super();
  }

  async login(email, password) {
    const findUser = await this.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      const isPasswordValid = compareCryptoHashedPassword(password, {
        salt: findUser.salt,
        hashedToken: findUser.hashedToken,
      });

      if (!isPasswordValid) throw new Error("Invalid password");

      return findUser;
    }

    throw new Error("User not found!");
  }

  async register(body) {
    const { hash, salt } = createCryptoHashedPassword(body.password);

    delete body.password;
    Object.assign(body, { hashedToken: hash, salt });

    return await this.user.create({
      data: body,
    });
  }

  async logout(token) {
    return await this.token.delete({
      where: {
        token,
      },
    });
  }
}

module.exports = AuthService;
