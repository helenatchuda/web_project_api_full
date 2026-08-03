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
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().uri().optional(),
    }),
  }),
  register
);

authsRouter.post("/login", authenticate);