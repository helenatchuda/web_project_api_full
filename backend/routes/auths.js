import { Router } from "express";
import { register } from "../controllers/user.js";
import { celebrate, Joi } from "celebrate";
import { authenticate } from "../controllers/user.js";

export const authsRouter = Router();

authsRouter.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(6).required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  register,
);
console.log("authsRouter", authsRouter);
authsRouter.post("/login", authenticate);
