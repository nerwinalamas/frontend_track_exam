import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../_actions/taskAction";
import { v4 as uuidv4 } from "uuid";
import { addTaskValidation } from "../helpers/validation";
import { formatDateTime } from "../helpers/dateFormater";

const AddTaskForm = () => {
	const [taskTitle, setTaskTitle] = useState("");
	const [taskType, setTaskType] = useState("");

	const [taskTitleError, setTaskTitleError] = useState("");
	const [taskTypeError, setTaskTypeError] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		const date = new Date();

		if (
			!addTaskValidation(
				taskTitle,
				setTaskTitleError,
				taskType,
				setTaskTypeError
			)
		)
			return;

		try {
			const newTasks = {
				id: uuidv4(),
				taskType: taskType,
				title: taskTitle,
				date: formatDateTime(date),
                subtasks: [],
			};
			dispatch(addTask(newTasks));
			
			setTaskTitle("");
			setTaskType("");
		} catch (error) {
			console.log("Error creating task: ", error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<h1 className="text-center text-2xl font-bold">Tasks Logger</h1>
			<div className="flex items-center gap-5 px-20">
				<label htmlFor="title" className="font-semibold cursor-pointer">
					Task Title:
				</label>
				<input
					type="text"
					name="title"
					id="title"
					value={taskTitle}
					onChange={(e) => {
						setTaskTitle(e.target.value);
						setTaskTitleError("");
					}}
					className="w-96 border-2 p-2 bg-customWhite"
				/>
			</div>
			{taskTitleError && (
				<p className="text-red-500 text-center font-semibold text-xs">
					{taskTitleError}
				</p>
			)}
			<div className="flex items-center gap-8 px-20">
				<label
					htmlFor="frontend"
					className="font-semibold cursor-pointer"
				>
					Task Type:
				</label>
				<div className="flex gap-2">
					<input
						type="radio"
						name="taskType"
						value="frontend"
						id="frontend"
						checked={taskType === "frontend"}
						onChange={() => {
							setTaskType("frontend");
							setTaskTypeError("");
						}}
						className="bg-customWhite"
					/>
					<label htmlFor="frontend" className="cursor-pointer">
						Frontend
					</label>
				</div>
				<div className="flex gap-2">
					<input
						type="radio"
						name="taskType"
						value="backend"
						id="backend"
						checked={taskType === "backend"}
						onChange={() => {
							setTaskType("backend");
							setTaskTypeError("");
						}}
						className="bg-customWhite"
					/>
					<label htmlFor="backend" className="cursor-pointer">
						Backend
					</label>
				</div>
				<input
					type="submit"
					value="Add"
					id="submit"
					className="px-10 py-2 rounded-sm font-semibold cursor-pointer bg-blue-500 text-customWhite"
				/>
			</div>
			{taskTypeError && (
				<p className="text-red-500 text-center font-semibold text-xs">
					{taskTypeError}
				</p>
			)}
		</form>
	);
};

export default AddTaskForm;
