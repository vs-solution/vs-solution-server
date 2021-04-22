require('dotenv').config();

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', 
	[
		check('email', 'Некорректный Email').isEmail(),
		check('password', 'Некорректный пароль').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: "Некорректные данные при регистрации"
			})
		}
		const { email, name, password } = req.body;
		const isUsed = await User.findOne({ email, name });

		if (isUsed) {
			return res.status(202).json({message: 'Данный Email/Имя уже заняты, попробуйте другое'})
		};

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = new User({	email, name, password: hashedPassword });

		await user.save();

		res.status(201).json({message: 'Пользователь создан'});
});

// Log In
router.post('/login', 
	[
		check('email', 'Некорректный Email').isEmail(),
		check('password', 'Некорректный пароль').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: "Некорректные данные при регистрации"
			})
		}
		const { email, password } = req.body;
		
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(202).json({message: "Такого пользователя не существует. Зарегистрируйтесь"})
		};

		const isMatch = bcrypt.compare(password, user.password);

		if(!isMatch) {
			return res.status(202).json({message: "Неверный пароль"})
		};

		const jwtSecret = process.env.SECRET;

		const token = jwt.sign(
			{ userId: user.id },
			jwtSecret,
			{ expiresIn: '1h' }
		);

		res.json({token, userId: user.id, name: user.name});

});

module.exports = router