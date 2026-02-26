import { AppError } from "./AppErros.js";

export class InternalError extends AppError {
  constructor(mensage = "Internal server error") {
    super(mensage, 500);
  }
}