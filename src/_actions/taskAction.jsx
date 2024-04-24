export const addTask = (data) => {
	return {
		type: "ADD_TASK",
		payload: data,
	};
};

export const deleteTask = (data) => {
	return {
		type: "DELETE_TASK",
		payload: data,
	};
};

export const addSubtask = (id, subtask) => {
	return {
		type: "ADD_SUBTASK",
		payload: { id, subtask },
	};
};

export const updateSubtaskStatus = (taskId, subtaskId, status) => {
	return {
		type: "UPDATE_SUBTASK_STATUS",
		payload: { taskId, subtaskId, status },
	};
};