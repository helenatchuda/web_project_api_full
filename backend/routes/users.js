import { getUserByName } from "../controllers/user.js";
import { getUserById } from "../controllers/user.js";
import { updateUser, updateCurrentUser, updateAvatar } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";
import { getAuthenticatedUser } from "../controllers/user.js";

import { Router } from "express";
export const usersRouter = Router();
//primeiro vem as rotas com nome fixo
usersRouter.get("/me", getAuthenticatedUser);
usersRouter.get("/", getUsers );
usersRouter.patch("/me", updateCurrentUser);
usersRouter.patch("/me/avatar", updateAvatar);
//depois vecm as rotas com o nome dinâmico
usersRouter.get("/:name", getUserByName);
usersRouter.get("/:id", getUserById);
usersRouter.patch("/:id", updateUser);
