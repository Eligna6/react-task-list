import React, { useState, useEffect } from "react";
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from "./components/TaskBanner";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {
  const [username, setUsername] = useState("Igna");
  const [taskItems, setTaskItems] = useState([
    { name: "Web Fundamentals yellow belt", done: true },
    { name: "Python black belt", done: true },
    { name: "Java black belt", done: true },
    { name: "MERN black belt", done: false },
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data !== null && data !== undefined) {
      setTaskItems(JSON.parse(data));
    } else {
      setTaskItems([
        { name: "Task uno", done: false },
        { name: "Task dos", done: false },
        { name: "Task tres", done: true },
        { name: "Task cuatro", done: false },
      ]);
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      console.log("Creando nueva tarea...");
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const deleteTask = (task) =>
    setTaskItems(
      taskItems.filter((t) => (t.name !== task.name))
    );

  const taskTableRows = (doneValue) =>
    taskItems
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} deleteTask={deleteTask} doneValue={doneValue}/>
      ));

  return (
    <div className="App">
      <TaskBanner username={username} taskItems={taskItems} />
      <div className="container">
        <TaskCreator taskItems={taskItems} callback={createNewTask} />
        <table className="mt-2 table table-striped table-bordered">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>
        <div className="text-center p-2 mb-2">
          <VisibilityControl
            description="tareas completas"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
