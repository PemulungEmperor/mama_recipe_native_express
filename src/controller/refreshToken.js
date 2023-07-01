const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401)
    const user = await userModel.findUserRefreshToken(refreshToken)
    if (!user.rows[0]) return res.status(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
      if (err) return res.status(403)
      const userId = user.rows[0].id
      const username = user.rows[0].username
      const email = user.rows[0].email
      const photo = user.rows[0].photo_path
      const accessToken = jwt.sign({ userId, username, email, photo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
      res.json({ accessToken })
    })
  } catch (err) {
    console.error(err)
  }
}
