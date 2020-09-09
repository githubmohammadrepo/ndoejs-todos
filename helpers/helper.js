const bcrypt = require('bcrypt');

// helper function hash password with bcrypt package
module.exports.hashPassword= function(password) {
  let hashedPasssword;
  return bcrypt.hashSync(password, 10, function (err, hash) {
    // Store hash in your password DB.
    hashedPasssword = hash;
  })
};