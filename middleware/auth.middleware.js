const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    // console.log('Токен', token) // Токен undefined

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации1'})
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded
    next()

  } catch (e) {
    res.status(401).json({ message: "Нет авторизации2" });
  }
}