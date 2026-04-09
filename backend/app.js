import express from "express";
import mongoose from "mongoose";
import { cardRouter } from "./routes/card.js";
import { authsRouter } from "./routes/auths.js";
import { reguestlogger, errorlogger } from "./middewares/regloggerMideware.js";
import { notfoundMiddleware } from "./middewares/notfound.js";
import { authMiddleware } from "./middewares/authMideware.js";
import { celebrate, errors } from "celebrate";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

/*middleware*/
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

/*rotas de autenticação (sem middleware)*/
app.use("/auths", authsRouter);

/*middleware de autenticação para rotas protegidas*/
app.use(authMiddleware);

/*rotas protegidas*/
app.use("/cards", cardRouter);

//*middleware de tratamento de erros do celebrate*/
app.use(errors());
app.use(reguestlogger);
app.use(errorlogger);

app.use(notfoundMiddleware);

const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
