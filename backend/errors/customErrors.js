import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
