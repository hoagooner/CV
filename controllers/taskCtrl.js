const Tasks = require('../models/TaskModel')


const taskCtrl = {
    getTasks: async (req, res) => {
        // try {
        //     console.log(req.query.board_id)

        //     const tasks = await Tasks.find({ board_id: req.query.board_id });
        //     console.log(tasks)
        //     res.json({
        //         status: 'success',
        //         result: boards.length,
        //         tasks: tasks
        //     })


        // } catch (err) {
        //     return res.status(500).json({ msg: err.message })
        // }
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

        // const board_id = req.body.board_id;
        // const description = req.body.description;
        // const title = req.body.title;
        // const duration = Number(req.body.duration);
        // const date = Date.parse(req.body.date);

        // console.log(board_id)

        // const newTask = new Tasks({
        //     board_id,
        //     title,
        //     description,
        //     duration,
        //     date
        // });

        // newTask.save()
        //     .then(() => res.json('Exercise added!'))
        //     .catch(err => res.status(400).json('Error: ' + err));
    },
    deleteTask: async (req, res) => {
        try {
            await Boards.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateTask: async (req, res) => {
        try {
            const { title, description, images } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })

            await Boards.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), description, images
            })

            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = taskCtrl