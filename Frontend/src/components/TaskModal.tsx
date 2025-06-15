import { useState, useEffect } from 'react';

type Task = {
    id?: string;
    title: string;
    description: string;
    deadline: string;
    status: string;
};

interface Props {
    task: Task | null;
    onClose: () => void;
    onSave: (task: Task) => void;
}

export const TaskModal = ({ task, onClose, onSave }: Props) => {
    const [formData, setFormData] = useState<Task>({
        title: '',
        description: '',
        deadline: '',
        status: 'Pending',
    });

    useEffect(() => {
        if (task) setFormData(task);
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: task?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-4">{task ? 'Update Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full border p-2 rounded"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                        required
                    />
                    <textarea
                        className="w-full border p-2 rounded"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />
                    <select
                        className="w-full border p-2 rounded"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <div className="flex justify-between pt-4">
                        <button type="button" onClick={onClose} className="text-red-500">Cancel</button>
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                            {task ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
