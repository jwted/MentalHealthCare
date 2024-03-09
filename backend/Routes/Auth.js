const express = require('express')
const { User } = require('../Models/index')
const { login, register } = require('../Controllers/Auth')
const router = express.Router()

router.post('/login', login)

router.post('/register', register)

module.exports = router