import{Card} from "../models/cards.js";
import { NotFoundError } from "../erros/NotFoundError.js";

export async function getCards(req,res,next){
  console.log("Minha requisição:", req);
  try{
    const Cards = await Card.find({});
    res.status(200).json(Cards);
  }catch(err){
    console.error("Erro ao buscar cartões:", err);
    next(err);
  }
}

 export async function getCardById(req,res){
  const card = Card.find(c=>c._id ===req.params.id)
    if(!card){
      throw new NotFoundError("ID do cartão não encontrado");

    }
    else{
      res.status(200).json(card)
    }

}
export async function createCard(req,res,next){
  const body = req.body
     console.log(body.name);


     try{
      const cardCreated = await Card.create({
        name: body.name,
        link: body.link,
        owner: body.owner,

      });
      console.log(cardCreated);
      res.status(201).json(cardCreated);
    }catch(err){
      next (err);

    }
}
export async function updateCard(req,res){
  const card = Card.find(c=> c._id === req.params.id)
    if(!card){
      throw new NotFoundError("ID do cartão não encontrado");
    }else{
      const body = req.body
      card.name = body.name || card.name
      card.link = body.link || card.link
      card.owner = body.owner || card.owner

      res.status(200).json(card)
    }
}
 export async function likeCard(req,res,next){
  const{cardId}= req.params;

  try{
    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      {$addToSet:{likes:req.user._id}},
      {new:true},
    ).orFail(()=>{throw new NotFoundError("ID do cartão não encontrado")});

    res.status(200).json(likedCard);
  }catch(err){
    return next (err);
  }
}
export async function dislikeCard (req,res,next){
  const{cardId}= req.params;

  try{
    const dislikedCard = await Card.findByIdAndUpdate(
      cardId,
      {$pull:{likes:req.user._id}},
      {new:true},
    ).orFail(()=>{throw new NotFoundError("ID do cartão não encontrado")});

    res.status(200).json(dislikedCard);
  }catch(err){
    return next (err);
  }
}
export async function deleteCard(req,res){
 const{id}=req.params
 console.log("ID to delete:", id);

 try{
  await Card
    .findByIdAndDelete(id)
    orFail(()=>{throw new NotFoundError("ID do cartão não encontrado")})
 }catch(err){
  return next (err);
 }
 res.status(200).json({message:"Cartão deletado com sucesso"})

}
