const Boards = require('../models/BoardModel')


const boardCtrl = {
    getBoards: async (req, res) => {
        try {

            const boards = await Boards.find({ user_id: req.query.user_id });

            res.json({
                status: 'success',
                result: boards.length,
                boards: boards
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createBoard: async (req, res) => {
        try {
            const { user_id, title, description, images } = req.body;

            const board = await Boards.findOne({ title, user_id })
            if (board)
                return res.status(400).json({ msg: "This board already exists." })

            const newBoard = new Boards({
                user_id, title, description, images
            })

            await newBoard.save()
            res.json({ msg: "Created a board" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteBoard: async (req, res) => {
        try {
            await Boards.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateBoard: async (req, res) => {
        try {
            const { title, description, images } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })

            await Boards.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), description,images
            })

            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = boardCtrl