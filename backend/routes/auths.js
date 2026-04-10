import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { register, authenticate } from "../controllers/auth.js";

export const authsRouter = Router();

authsRouter.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  register
);

authsRouter.post("/login", authenticate);