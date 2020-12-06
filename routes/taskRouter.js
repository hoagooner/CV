const router = require('express').Router()
const taskCtrl = require('../controllers/taskCtrl.js')
const auth = require('../middleware/auth')


router.route('/tasks')
    .get(taskCtrl.getTasks)
    .post(taskCtrl.createTask)


router.route('/tasks/:id')
    .delete(taskCtrl.deleteTask)
    .put(taskCtrl.updateTask)


module.exports = router;


// const router = require('express').Router();
// let Tasks = require('../models/TaskModel');


// router.route('/tasks').post((req, res) => {

//     const board_id = req.body.board_id;
//     const description = req.body.description;
//     const title = req.body.title;
//     const duration = Number(req.body.duration);
//     const date = Date.parse(req.body.date);

//     console.log(board_id)

//     const newTask = new Tasks({
//         board_id,
//         title,
//         description,
//         duration,
//         date
//     });
//     newTask.save()
//         .then(() => res.json('task added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


// module.exports = router;