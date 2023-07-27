export interface ExpressError extends Error {
  statusCode?: number;
}

export class InvalidParamsError extends Error {
  name: string = "InvalidParamsError";
  statusCode: number = 400;
}

export class UnauthorizedError extends Error {
  name: string = "UnauthorizedError";
  statusCode: number = 401;
}

export class RecordNotFoundError extends Error {
  name: string = "RecordNotFoundError";
  statusCode: number = 404;
}
