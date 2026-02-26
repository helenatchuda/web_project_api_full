import { NotFoundError } from "../erros/NotFoundError.js";
import { User } from "../models/users.js";

export async function getUserByName(req, res, next) {
  const name =req.params.name;

  try {
    const user = await User.findOne({
      name: name,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError("ID do usuário não encontrado");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
}
export async function getAuthenticatedUser(req, res, next) {
  const userId = req.user._id;
  console.log(userId)
   try{
    const user = await User.findById(userId);
    if(!user){
      throw new NotFoundError("ID do usuário não encontrado")
    }
    res.status(200).json(user);

   }catch(err){
    next(err);
   }
}


export async function getUsers(req, res, next) {
  try {
    const Users = await User.find({});
    return res.status(200).json(Users);
  } catch (err) {
   return next(err);
  }
}



export async function updateUser(req, res){
  const user = User.find(item=> item._id ===req.params.id)
      if(!user){
        throw new NotFoundError("ID do usuário não encontrado")
      }else{
        const body = req.body
        user.name = body.name || user.name
        user.about = body.about || user.about
        user.avatar = body.avatar || user.avatar

        res.status(200).json(user)

}}