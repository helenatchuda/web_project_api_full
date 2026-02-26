export function notfoundMiddleware(req, res, next) {

  res.status(404).json({"message":"A solicitação não foi encontrada"})
}
