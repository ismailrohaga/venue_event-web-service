const crypto = require("crypto");

const createCryptoHashedPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");

  return {
    hash,
    salt,
  };
};

const compareCryptoHashedPassword = (password, { salt, hashedToken }) => {
  const hashCrypto = crypto
    .pbkdf2Sync(password, salt, 10000, 512, `sha512`)
    .toString(`hex`);

  return hashedToken === hashCrypto;
};

module.exports = {
  createCryptoHashedPassword,
  compareCryptoHashedPassword,
};
