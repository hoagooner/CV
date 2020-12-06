const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  username: { type: String, required: false},
  board_id: {type: String, required: true},
  title:{type: String, required: true},
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;