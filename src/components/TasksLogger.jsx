import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../_actions/taskAction";
import AddTaskForm from "./AddTaskForm";
import { AiOutlineDelete } from "react-icons/ai";
import { getTaskBackgroundColor } from "../helpers/colorSetter"

import TaskModal from "./TaskModal";

const TasksLogger = () => {
    const [selectedTasks, setSelectedTasks] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    const handleModal = (tasks) => {
        setSelectedTasks(tasks);
        document.getElementById("my_modal_3").showModal();
    };

    return (
        <div className="w-2/4 h-auto p-7 flex flex-col gap-8 rounded-sm bg-customWhite text-customBlack">
            <AddTaskForm />
            <div className="flex gap-5">
                <div className="w-80 h-80 p-2 flex flex-col gap-3 border-2 ">
                    <h2 className="text-center font-bold text-lg">Frontend</h2>
                    <div className="flex flex-col gap-2 p-2 overflow-y-auto">
                        {tasks.filter((task) => task.taskType === "frontend")
                            .length > 0 ? (
                            tasks.map((task) =>
                                task.taskType === "frontend" ? (
                                    <div
                                        className="flex items-center gap-3"
                                        key={task.id}
                                    >
										<div className="w-80  border-2 cursor-pointer " onClick={() => handleModal(task)}>
											<div
												className={`p-3 ${getTaskBackgroundColor(
													task
												)}`}
												style={{
													width: `${
														task.subtasks.length > 0
															? (((task.subtasks.filter((item) => item.status === "ongoing").length + task.subtasks.filter((item) => item.status === "completed").length) / task.subtasks.length) * 100).toFixed(2)
															: 100
													}%`
												}}
											>
												<p>{task.title}</p>
											</div>
										</div>
                                        
                                        <AiOutlineDelete
                                            size={35}
                                            className="cursor-pointer text-red-500"
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                        />
                                    </div>
                                ) : null
                            )
                        ) : (
                            <p>No frontend tasks</p>
                        )}
                    </div>
                </div>
                <div className="w-80 h-80 p-2 flex flex-col gap-3 border-2 ">
                    <h2 className="text-center font-bold text-lg">Backend</h2>
                    <div className="flex flex-col gap-2 p-2 overflow-y-auto">
                        {tasks.filter((task) => task.taskType === "backend")
                            .length > 0 ? (
                            tasks.map((task) =>
                                task.taskType === "backend" ? (
                                    <div
                                        className="flex items-center gap-3"
                                        key={task.id}
                                    >
										<div className="w-80  border-2 cursor-pointer " onClick={() => handleModal(task)}>
											<div
												className={`p-3 ${getTaskBackgroundColor(
													task
												)}`}
												style={{
													width: `${
														task.subtasks.length > 0
															? (((task.subtasks.filter((item) => item.status === "ongoing").length + task.subtasks.filter((item) => item.status === "completed").length) / task.subtasks.length) * 100).toFixed(2)
															: 100
													}%`
												}}
											>
												<p>{task.title}</p>
											</div>
										</div>
                                        <AiOutlineDelete
                                            size={35}
                                            className="cursor-pointer text-red-500"
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                        />
                                    </div>
                                ) : null
                            )
                        ) : (
                            <p>No backend tasks</p>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <TaskModal
                selectedTasks={selectedTasks}
                setSelectedTasks={setSelectedTasks}
            />
        </div>
    );
};

export default TasksLogger;
