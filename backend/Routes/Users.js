const express = require('express')
const { User } = require('../Models/index')
const {register } = require('../Controllers/Auth')
const {getProfile } = require('../Controllers/Users')
const router = express.Router()

router.post('/', register)
router.get('/:userId', getProfile)

module.exports = router