const express = require('express')
const {getUser,getUsers,editProfile, getUserObjectives } = require('../Controllers/Users')
const {addObjectiveToUser} = require('../Controllers/Objectives')
const {getUserBadges,addBadgeToUser} = require('../Controllers/Badges')
const {verifyAdmin,verifyUser, verifySameUser}= require('../Middlewares/jwt')
const {idsValidation,offsetLengthValidation}= require('../Middlewares/objMid')
const router = express.Router()

router.get('/',offsetLengthValidation,idsValidation,getUsers)

router.post('/:userId/objectives/:objectiveId',verifyUser, addObjectiveToUser)
router.get('/:userId', getUser)
router.put('/:userId',editProfile)

router.get('/:userId/objectives',verifyUser,getUserObjectives)
router.get('/:userId/objectives/:objectiveId',verifyUser,getUserObjectives)

router.get("/:userId/badges",verifyUser,getUserBadges)
router.post("/badges",verifyUser,addBadgeToUser)

module.exports = router