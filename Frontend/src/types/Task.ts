export type Task = {
    id?: string;
    title: string;
    description: string;
    deadline: string;
    status: string;
    assignedTo?: {
        _id: string;
        email: string;
        name: string;
    };
};