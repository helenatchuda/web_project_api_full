import { getUserByName } from "../controllers/users.js";
import { getUserById } from "../controllers/users.js";
import { updateUser } from "../controllers/users.js";
import { getUsers } from "../controllers/users.js";
import { getAuthenticatedUser } from "../controllers/users.js";


import { Router } from "express";
export const usersRouter = Router();

usersRouter.get("/:name", getUserByName);

usersRouter.get("/:id", getUserById);
usersRouter.get("/", getUsers);

usersRouter.get("/me", getAuthenticatedUser);
usersRouter.patch("/:id", updateUser);
