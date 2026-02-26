import{AppError} from"./AppErros.js";

export class BadRequest extends AppError {
  constructor(mensage) {
    super(mensage, 400);
  }
}