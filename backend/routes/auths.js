import { Router } from "express";
import {  register} from "../controllers/auth.js";
import {celebrate,Joi} from "celebrate";
import { authenticate } from "../controllers/auth.js";
import {authMiddleware} from "../middewares/authMideware.js";
import {logout} from  "../controllers/auth.js";
import { refreshToken } from "../controllers/auth.js";



export const authsRouter = Router();

authsRouter.post(
  "/register",
   celebrate({
    body:Joi.object().keys({
      email:Joi.string().min(6).required(),
      password:Joi.string().min(6).required(),
   })
  }),
   register
  );

authsRouter.post("/login", authenticate);
authsRouter.post("/logout", authMiddleware, logout);
authsRouter.post("/refresh-token", refreshToken);