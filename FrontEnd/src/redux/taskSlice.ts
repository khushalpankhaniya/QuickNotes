import { createSlice } from "@reduxjs/toolkit"

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [] as Task[],
    },

    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },

        createTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload];
        },

        editTask: (state, action) => {
            const index = state.tasks.findIndex((x) => x._id == action.payload.id)
            state.tasks[index] = { ...state.tasks[index], title: action.payload.title, completed: action.payload.completed };
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            state.tasks = state.tasks.filter((task) => task._id !== id);
        },
        deleteAllTask: (state) => {
          state.tasks = [];
        },
    },
});

export const { setTasks, createTask, editTask, deleteTask, deleteAllTask } = taskSlice.actions;
export default taskSlice.reducer;