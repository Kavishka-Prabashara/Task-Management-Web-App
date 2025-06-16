import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskModal } from '../components/TaskModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Task } from '../types/Task';

const DashboardPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState('');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    // Define your API base URL using the environment variable
    const API_BASE_URL = import.meta.env.VITE_API_URL; // <--- ADD THIS LINE

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/tasks?search=${search}`, // <--- USE API_BASE_URL HERE
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Fetch error:', err);
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleAddClick = () => {
        setSelectedTask(null);
        setModalOpen(true);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setModalOpen(true);
    };

    const handleSave = async (task: Task) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/tasks`, { // <--- USE API_BASE_URL HERE
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });

        if (res.ok) {
            fetchTasks();
            setModalOpen(false);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Title', 'Deadline', 'Status', 'Assigned To']],
            body: tasks.map((t) => [
                t.title,
                t.deadline,
                t.status,
                t.assignedTo?.email || 'N/A',
            ]),
        });
        doc.save('tasks.pdf');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="space-x-2">
                    <button
                        onClick={handleAddClick}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 w-full rounded border"
            />

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        onClick={() => handleTaskClick(task)}
                        className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
                    >
                        <div className="font-semibold">{task.title}</div>
                        <div className="text-sm text-gray-600">
                            {task.status} | Due: {task.deadline} | Assigned: {task.assignedTo?.email || 'N/A'}
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default DashboardPage;