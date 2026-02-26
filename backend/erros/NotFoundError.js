import { AppError } from "./AppErros.js";

export class NotFoundError extends AppError {

  constructor(mensage) {
    super(mensage, 404);
  }
}