import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../erros/Unauthorize.js";



export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if(!token || !token.startsWith('Bearer ')){
    throw new UnauthorizedError('Unauthorized')
  }

  const tokenWithoutBearer = token.replace('Bearer ', '')
  try {
    const payload = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET)

  } catch (err) {
    throw new UnauthorizedError('Unauthorized')
  }

 req.user = {
  _id : payload._id
 }
  next();
}
