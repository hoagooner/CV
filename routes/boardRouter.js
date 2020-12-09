const router = require('express').Router()
const boardCtrl = require('../controllers/boardCtrl.js')
const auth = require('../middleware/auth')


router.route('/boards')
    .get(boardCtrl.getBoards)
    .post(auth, boardCtrl.createBoard)

router.route('/board/:board_id')
    .get(boardCtrl.getBoard)

router.route('/boards/:id')
    .delete(auth, boardCtrl.deleteBoard)
    .put(auth, boardCtrl.updateBoard)


module.exports = router