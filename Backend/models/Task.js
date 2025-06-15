// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    description: String,
    deadline: String,
    status: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅
});

module.exports = mongoose.model('Task', TaskSchema);
