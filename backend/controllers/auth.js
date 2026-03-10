import{compare,genSalt,hash} from 'bcryptjs'
import { User } from '../models/users.js'
import { UnauthorizedError } from '../erros/Unauthorize.js';
import jwt from 'jsonwebtoken';

export async function register(req, res, next) {
  const body = req.body;
  console.log("body.name",body.name);

  try {

    const salt = await genSalt(10)
    const hashPassword = await hash(body.password, salt)


    const userCreated = await User.create({

      email: body.email,
      hashPassword:hashPassword
    });
    console.log(userCreated);
    res.status(201).json(userCreated);
  } catch (err) {
    next(err);
  }
}


export async function authenticate(req, res, next) {
  const {email, password}= req.body;

  try {

    const user = await User.findOne({email:email}).select("+hashPassword")
    console.log("dados do utilizador",user)
    if(!user){
      throw new UnauthorizedError('Email ou senha inválidos')
    }
    const isPasswordCorrect = await compare(password, user.hashPassword)

    if(!isPasswordCorrect){

      throw new UnauthorizedError('Email ou senha inválidos')
    }

    const token = jwt.sign(
      {_id: user. _id},
     process.env.JWT_SECRET,
      {expiresIn: 5*60}, // 7 dias em segundos

    )

    const refreshToken = jwt.sign(
      {_id: user. _id},
     process.env.JWT_SECRET,
      {expiresIn: 7*24*60*60},

    )
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie(
      'refreshToken',
      refreshToken,
      {
        httpOnly: true,
        secure: true,
        SameSite: 'None',
        maxAge: 7*24*60*60 // 7 dias em milissegundos
      }
     )



    res.status(200).json({token})
  next()
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(req, res, next) {
  try{
    const {refreshToken} = req.cookies;
    if(!refreshToken){
      throw new UnauthorizedError('Token de atualização ausente')

    }
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
  } catch(err){
    next(err);
  }


}
export async function logout(req, res, next) {
 const userId = res.user._id;

    try{

      await User.findByIdAndUpdate(userId,{refreshToken: null})
      res.clearCookies('refreshToken',
        {
          httpOnly: true,
        secure: true,
        SameSite: 'None',

        }
      )
     res.status(204).send()
    }catch(err){
      next(err);
    }
}