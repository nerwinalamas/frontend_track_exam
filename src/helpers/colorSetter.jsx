
export const getTaskBackgroundColor = (task) => {
    if (task.subtasks.length === 0) {
        return "bg-customWhite";
    }

    const allSubtasksCompleted = task.subtasks.every(
        (subtask) => subtask.status === "completed"
    );
    const allSubtasksPending = task.subtasks.every(
        (subtask) => subtask.status === "pending"
    );
    const hasOngoingSubtask = task.subtasks.some(
        (subtask) => subtask.status === "ongoing"
    );

    if (allSubtasksCompleted) {
        return "bg-green-700";
    } else if (allSubtasksPending) {
        return "bg-customWhite";
    } else if (hasOngoingSubtask) {
        return "bg-yellow-300";
    } else {
        return "bg-customWhite";
    }
};

export const setColor = (status) => {
    switch (status) {
        case "pending":
            return "bg-gray-400";
        case "ongoing":
            return "bg-yellow-300";
        case "completed":
            return "bg-green-700";
        default:
            return "bg-gray-400";
    }
};