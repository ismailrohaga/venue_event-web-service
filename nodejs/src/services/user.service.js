const { prisma } = require("../utils");
const { createCryptoHashedPassword } = require("../utils/crypto");

class UserService {
  constructor() {}

  async getUser(id) {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
          role: true,
          hashedToken: false,
          salt: false,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
