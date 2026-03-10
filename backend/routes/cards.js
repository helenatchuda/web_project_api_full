
import { Router } from "express";

import{ getCardById } from "../controllers/cards.js";
import { createCard } from "../controllers/cards.js";
import { updateCard } from "../controllers/cards.js";
import {  getCards } from "../controllers/cards.js";
import { deleteCard } from "../controllers/cards.js";
import { likeCard } from "../controllers/cards.js";
import { dislikeCard } from "../controllers/cards.js";

export const cardsRouter = Router();




cardsRouter.get("/:id", getCardById);

cardsRouter.post("/",createCard);
cardsRouter.put("/:id",updateCard);

 cardsRouter.delete("/:id", deleteCard);
 cardsRouter.put("/:cardId/likes", likeCard);
cardsRouter.delete("/:cardId/likes", dislikeCard);
cardsRouter.get("/", getCards);
