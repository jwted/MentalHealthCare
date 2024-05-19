const express = require('express')
const {getUser,getUsers,editProfile } = require('../Controllers/Users')
const {addObjectiveToUser} = require('../Controllers/Objectives')
const {verifyAdmin,verifyUser, verifySameUser}= require('../Middlewares/jwt')
const {idsValidation,offsetLengthValidation}= require('../Middlewares/objMid')
const router = express.Router()

// router.get('/',verifyUser,offsetLengthValidation,idsValidation,getUsers)

// router.post('/:userId/objectives/:objectiveId',verifyUser, addObjectiveToUser)
// router.get('/:userId',verifyUser, getUser)
// router.put('/:userId',editProfile)

//ONLY FOR TESTING IN FRONTEND
router.get('/',offsetLengthValidation,idsValidation,getUsers)

router.post('/:userId/objectives/:objectiveId',verifyUser, addObjectiveToUser)
router.get('/:userId', getUser)
router.put('/:userId',editProfile)

module.exports = router