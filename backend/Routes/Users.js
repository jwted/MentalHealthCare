const express = require('express')
const { User } = require('../Models/index')
const {register } = require('../Controllers/Auth')
const {getUser } = require('../Controllers/Users')
const router = express.Router()

//router.get('/', getUsers)
router.get('/:userId', getUser)

module.exports = router