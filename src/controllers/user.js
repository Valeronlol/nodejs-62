const { User } = require('../services/db/models')

exports.findUsers = async (req, res) => {
  const { limit = 500, offset = 0 } = req.query
  const limitAndOffsetParams = {
    limit,
    offset,
    order: [
      ['id', 'DESC'],
    ],
  }
  const users = await User.findAll(limitAndOffsetParams)
  res.send(users)
}

exports.createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
}
