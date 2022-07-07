//user classs
const e = require("express");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../utils/errors");
const { UnauthorizedError } = require("../utils/errors");

class User {
  static async makePubUser() {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      location: user.location,
      date: user.date,
    };
  }

  static async login(creds) {
    //enter creds, if missing throw err
    const reqFields = ["email", "password"];
    reqFields.forEach((field) => {
      if (!creds.hasOwnProperty(field)) {
        throw new BadRequestError(`missing ${field} in req body`); //test on posty by entering nothing -->/auth/login
      }
    });

    const user = await User.fetchUserByEmail(creds.email);
    if (user) {
      throw new BadRequestError(`Alr signed ${creds.email} up`);
    }
    //lookup user in db, if found compare password
    if (user) {
      const isvalid = await bcrypt.compare(creds.password, user.password);
      if (isvalid) {
        return User.makePubUser(user);
      }
    }
    //if password correct, return user
    //if not throw err

    throw new UnauthorizedError("wrong user/password");
  }
  static async register(creds) {
    const reqFields = ["email", "password"];
    reqFields.forEach((field) => {
      if (!creds.hasOwnProperty(field)) {
        throw new BadRequestError(`missing ${field} in req body`);
      }
    });
    //if a field is missing throw err
    //if alr reg throw err
    //missing index err here
    if (creds.email.indexOf("@") <= 0) {
      throw new BadRequestError("invalid email"); //ehhh
    }

    const existUser = await User.fetchUserByEmail(creds.email);
    if (existUser) {
      throw new BadRequestError(`Alr signed ${creds.email} up`);
    }
    //hash user pass, lowercase email
    const hashedPw = await bcrypt.hash(creds.password, BCRYPT_WORK_FACTOR); //note await v promise, here w callback

    const lowercaseE = creds.email.toLowerCase();
    const result = await db.query(
      `insert into users ( 
        email, password 
    ) values ($1,$2) 
    returning id, password, first_name, last_name, email, location, date;
    `,
      [lowercaseE, hashedPw]
    );

    //ret user

    const user = result.rows[0];
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("no email here");
    }
    const query = `select * from users where email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}
module.exports = User;
