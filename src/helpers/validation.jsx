
export const addTaskValidation = (taskTitle, setTaskTitleError, taskType, setTaskTypeError) => {
    let valid = true;

    if (!taskTitle) {
        setTaskTitleError("Task title is required")
        valid = false;
    }

    if (!taskType) {
        setTaskTypeError("Task type is required")
        valid = false;
    }

    return valid
}

export const addSubtaskValidation = (subtask, setSubtaskError) => {
    let valid = true;

    if (!subtask) {
        setSubtaskError("Subtask title is required");
        valid = false
    }

    return valid
}