import React from "react";
import TasksLogger from "./components/TasksLogger";

const App = () => {
	return (
		<div className="h-screen w-screen font-poppins flex items-center justify-center bg-customBlack text-customWhite">
			<TasksLogger />
		</div>
	);
};

export default App;
