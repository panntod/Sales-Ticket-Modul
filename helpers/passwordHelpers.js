const bcrypt = require("bcrypt");

exports.GeneratePassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

exports.ComparePassword = async (password, passwordHash) => {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
};
