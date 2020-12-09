const Tasks = require('../models/TaskModel')


const taskCtrl = {
    getTasks: async (req, res) => {
        Tasks.find({ board_id: req.query.board_id })
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    createTask: async (req, res) => {
        try {
            console.log("abcdef")
            const { board_id, title, description, duration, date } = req.body;

            const newTask = new Tasks({
                board_id, title, description, duration, date
            })

            await newTask.save()
            res.json({ msg: "Created a board" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteTask: async (req, res) => {
        Tasks.findByIdAndDelete(req.params.task_id)
            .then(() => res.json('Tasks deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    updateTask: async (req, res) => {
        Tasks.findById(req.params.task_id)
            .then(task => {
                task.username = req.body.username;
                task.title = req.body.title;
                task.description = req.body.description;
                task.duration = Number(req.body.duration);
                task.date = Date.parse(req.body.date);

                task.save()
                    .then(() => res.json('Task updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    getTask: async (req, res) => {
        console.log(req.params.task_id)
        Tasks.findById(req.params.task_id)
            .then(task => res.json(task))
            .catch(err => res.status(400).json('Error: ' + err));
    },
}


module.exports = taskCtrl