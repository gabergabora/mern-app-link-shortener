const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),  // Invalid email format
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })  // Password min length 6 symbols
  ],
   async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации"  // Invalid registration data format
      });
    }

    const { email, password } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      res.status(400).json({ message: 'Такой пользователь уже существует' })  // User already exists
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })  // User created

  } catch(e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова"});  // Smth went south, try again...
  }
})

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),  // Invalid email
    check("password", "Некорректный email или пароль").exists(),            // Invalid email or password
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",  // Invalid login data
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });  // User not found
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль, попробуйте снова" });  // Invalid email or password
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {expiresIn: "1h"})

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });  // Smth went south, try again...
  }
})


module.exports = router