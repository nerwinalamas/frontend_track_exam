import React, { useState } from "react";
import { FaArrowsSpin, FaRegCircleCheck } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { addSubtaskValidation } from "../helpers/validation";
import { addSubtask, updateSubtaskStatus } from "../_actions/taskAction";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setColor } from "../helpers/colorSetter"

const TaskModal = ({ selectedTasks, setSelectedTasks }) => {
	const [subtask, setSubtask] = useState("");
	const [subtaskError, setSubtaskError] = useState("");

	const dispatch = useDispatch();

	const handleSubmitModal = (e) => {
		e.preventDefault();

		if (!addSubtaskValidation(subtask, setSubtaskError)) return;

		try {
			const newSubtask = {
				id: uuidv4(),
				title: subtask,
				status: "pending",
			};
			dispatch(addSubtask(selectedTasks.id, newSubtask));
			setSelectedTasks((prev) => ({
				...prev,
				subtasks: [...prev.subtasks, newSubtask],
			}));

			setSubtask("");
		} catch (error) {
			console.log("Error creating subtask: ", error);
		}
	};

	const handleStatusChange = (subtaskId, newStatus) => {
		const updatedSubtasks = selectedTasks.subtasks.map((subtask) =>
			subtask.id === subtaskId
				? { ...subtask, status: newStatus }
				: subtask
		);

		setSelectedTasks((prev) => ({
			...prev,
			subtasks: updatedSubtasks,
		}));

		dispatch(updateSubtaskStatus(selectedTasks.id, subtaskId, newStatus));
	};

	return (
		<dialog id="my_modal_3" className="modal">
			<div className="modal-box bg-customWhite flex flex-col justify-center items-center">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				<h3 className="font-bold text-2xl">{selectedTasks.title}</h3>
				<p className="my-2 text-gray-500 text-sm">
					Last Added {selectedTasks.date}
				</p>

				<form
					onSubmit={handleSubmitModal}
					className="w-full my-5 flex flex-col gap-2"
				>
					<div className="flex gap-1 ">
						<input
							type="text"
							name="subtask"
							id="subtask"
							placeholder="Type your subtask"
							value={subtask}
							onChange={(e) => {
								setSubtask(e.target.value);
								setSubtaskError("");
							}}
							className="w-full p-2 bg-customWhite border-2"
						/>
						<input
							type="submit"
							value="Add"
							name="submit"
							id="submit"
							className="px-5 bg-blue-500 text-customWhite rounded-sm cursor-pointer"
						/>
					</div>
					{subtaskError && (
						<p className="text-red-500 self-start font-semibold text-xs">
							{subtaskError}
						</p>
					)}
				</form>

				<div className="h-80 w-full flex flex-col gap-3 overflow-y-auto">
					{selectedTasks.subtasks?.map((subtask) => (
						<div
							key={subtask.id}
							className={`flex justify-between w-full p-3 rounded-sm text-customWhite ${setColor(subtask.status)}`}
						>
							<p>{subtask.title}</p>
							<div className="flex items-center gap-3">
								<LuClock
									size={20}
									className="cursor-pointer text-customBlack"
									title="Pending"
									value="pending"
									onClick={() =>
										handleStatusChange(
											subtask.id,
											"pending"
										)
									}
								/>
								<FaArrowsSpin
									size={20}
									className="cursor-pointer text-yellow-500"
									title="Ongoing"
									value="ongoing"
									onClick={() =>
										handleStatusChange(
											subtask.id,
											"ongoing"
										)
									}
								/>
								<FaRegCircleCheck
									size={20}
									className="cursor-pointer text-green-500"
									title="Completed"
									value="completed"
									onClick={() =>
										handleStatusChange(
											subtask.id,
											"completed"
										)
									}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</dialog>
	);
};

export default TaskModal;