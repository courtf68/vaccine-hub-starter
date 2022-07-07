//user classs
const db = require("../db");
const { UnauthorizedError } = require("./utils/errors");

class User {
  static async login(creds) {
    //enter creds, if missing throw err
    //lookup user in db, if found compare password
    //if password correct, return user
    //if not throw err
    throw new UnauthorizedError("wrong user/password");
  }
  static async register(creds) {
    //if a field is missing throw err
    //if alr reg throw err
    //hash user pass, lowercase email
    //ret user
  }
}
module.exports = User;
