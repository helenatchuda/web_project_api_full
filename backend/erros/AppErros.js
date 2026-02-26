export class AppError extends Error {
  constructor(mensage, statusCode) {
    super(mensage);
    this.statusCode = statusCode;

  }
}
