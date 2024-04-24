const initialState = {
	tasks: [],
};

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TASK":
			const newTask = {
				...action.payload,
				subtasks: [],
			};
			return {
				...state,
				tasks: [...state.tasks, newTask],
			};
		case "DELETE_TASK":
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		case "ADD_SUBTASK":
			const updateTask = state.tasks.map((task) =>
				task.id === action.payload.id
					? {
							...task,
							subtasks: [
								...task.subtasks,
								action.payload.subtask,
							],
					  }
					: task
			);
			return {
				...state,
				tasks: updateTask,
			};
		case "UPDATE_SUBTASK_STATUS":
			const updatedTasks = state.tasks.map((task) => {
				if (task.id === action.payload.taskId) {
					const updatedSubtasks = task.subtasks.map((subtask) => {
						if (subtask.id === action.payload.subtaskId) {
							return {
								...subtask,
								status: action.payload.status,
							};
						}
						return subtask;
					});
					return {
						...task,
						subtasks: updatedSubtasks,
					};
				}
				return task;
			});

			return {
				...state,
				tasks: updatedTasks,
			};
		default:
			return state;
	}
};

export default taskReducer;
