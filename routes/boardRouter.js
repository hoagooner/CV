const router = require('express').Router()
const boardCtrl = require('../controllers/boardCtrl.js')
const auth = require('../middleware/auth')


router.route('/boards')
    .get(boardCtrl.getBoards)
    .post(auth, boardCtrl.createBoard)

module.exports = router