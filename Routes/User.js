const router = require('express').Router()
const controller = require('../Controller/AuthController')
router.post('/login', controller.postLogin )

router.post('/signup', controller.postSignUp)

router.get('/getSessions', controller.getSessions)

router.post('/logout', controller.logout)
module.exports = router