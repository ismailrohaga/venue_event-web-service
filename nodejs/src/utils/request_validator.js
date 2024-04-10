const { assert } = require("superstruct");

const requestValidator = (validator) => {
  return (req, res, next) => {
    try {
      assert(req.body, validator);
      next();
    } catch (error) {
      const errors = error.failures().map(({ key, type, message }) => {
        return {
          key,
          type,
          message,
        };
      });

      res.status(500).json({
        errors,
      });
    }
  };
};

module.exports = requestValidator;
