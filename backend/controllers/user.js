
import { User } from '../models/users.js'
import { UnauthorizedError } from '../erros/Unauthorize.js';

export async function getUserByName(req, res, next) {
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
export async function getUserById(req, res, next) {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      throw new UnauthorizedError()
    }

    return res.status(200).json(user)
  } catch (err) {
    return next(err)
  }
}


 export async function  getUsers (req, res, next) {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (err) {
    return next(err)
  }
}

export async function updateUser(req, res, next) {
  const { id } = req.params
  const body = req.body

  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        name: body.name,
        about: body.about,
        avatar: body.avatar
      },
      { new: true }
    )

    if (!userUpdated) {
      throw new UnauthorizedError()
    }

    return res.status(200).json(userUpdated)
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