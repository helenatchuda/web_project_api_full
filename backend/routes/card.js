
import { Router } from "express";

import{ getCardById } from "../controllers/card.js";
import { createCard } from "../controllers/card.js";
import { updateCard } from "../controllers/card.js";
import {  getCards } from "../controllers/card.js";
import { deleteCard } from "../controllers/card.js";
import { likeCard } from "../controllers/card.js";
import { dislikeCard } from "../controllers/card.js";

export const cardRouter = Router();




cardRouter.get("/:id", getCardById);

cardRouter.post("/",createCard);
cardRouter.put("/:id",updateCard);

 cardRouter.delete("/:id", deleteCard);
 cardRouter.put("/:cardId/likes", likeCard);
cardRouter.delete("/:cardId/likes", dislikeCard);
cardRouter.get("/", getCards);
