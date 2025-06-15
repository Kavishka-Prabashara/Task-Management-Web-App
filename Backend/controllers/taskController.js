
// Convert _id to id before sending to frontend
const formatTask = (task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    status: task.status,
});
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const search = req.query.search || '';
        const status = req.query.status;
        const filter = {
            userId: req.user.id,
            title: { $regex: search, $options: 'i' },
        };
        if (status) filter.status = status;

        const tasks = await Task.find(filter).populate('assignedTo', 'name email');
        res.json(tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            assignedTo: task.assignedTo,
        })));
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};


exports.saveTask = async (req, res) => {
    const { id, title, description, deadline, status } = req.body;
    try {
        if (id) {
            const updated = await Task.findOneAndUpdate(
                { _id: id, userId: req.user.id },
                { title, description, deadline, status },
                { new: true }
            );
            return res.json(formatTask(updated));
        } else {
            const newTask = await Task.create({
                userId: req.user.id,
                title,
                description,
                deadline,
                status,
            });
            return res.status(201).json(formatTask(newTask));
        }
    } catch {
        res.status(500).json({ message: 'Failed to save task' });
    }
};
