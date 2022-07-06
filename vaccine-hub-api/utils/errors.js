//inherits means extend
class ExpressError extends Error {
  constructor(message, status) {
    super(); //y super, ik can do super(message) too n delete line 6
    this.status = status;
    this.message = message;
  }
}

class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400); //what does super dooo
  }
}
class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized Request") {
    super(message, 401); //what does super dooo
  }
}
class ForbiddenError extends ExpressError {
  constructor(message = "Forbidden") {
    super(message, 403); //what does super dooo
  }
}
class NotFoundError extends ExpressError {
  constructor(message = "Not found") {
    super(message, 404); //what does super dooo
  }
}

module.exports = {
  ExpressError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
