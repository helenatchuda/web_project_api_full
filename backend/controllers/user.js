
import { User } from '../models/users.js'
import { UnauthorizedError } from '../erros/UnauthorizedError.js';

export async function getUserByUsername(req, res, next) {
  const { username: usernameQuery } = req.query

  try {
    const user = await User.findOne({
      username: usernameQuery
    })
    return res.status(200).json(user)
  } catch (err) {
    return next(err)
  }
}

export async function getAuthenticatedUser(req, res, next) {
  const userId = req.user._id

  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new UnauthorizedError()
    }

    return res.status(200).json(user)
  } catch (err) {
    return next(err)
  }
}