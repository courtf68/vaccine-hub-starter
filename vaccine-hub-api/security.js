const bcrypt = require("bcrypt");
const pw = "secret";

bcrypt.hash(pw, 6, (err, hashedPw) => {
  console.log(`password is ${pw}`);
  console.log(`hashed pw is ${hashedPw}`);
});
