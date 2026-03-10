import express  from 'express';
import mongoose from  'mongoose';
import path from 'node:path';
import { cardsRouter } from './routes/cards.js';
import { usersRouter } from './routes/users.js';
import {reguestlogger,errorlogger} from './middewares/regloggerMideware.js';
import{ notfoundMiddleware}from "./middewares/notfound.js";
import { authsRouter } from './routes/auths.js';
import {celebrate, errors} from 'celebrate';
import  'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authMiddleware } from './middewares/authMideware.js';



const app = express();
const port = 3001;



main()
.then(() =>console.log('Connected to DB'))
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

/*middleware*/
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))


//*middleware de tratamento de erros do celebrate*/
app.use(errors())
app.use(reguestlogger);
app.use(errorlogger);


app.use('/auths', authsRouter);
app.use(authMiddleware)
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use(notfoundMiddleware);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});