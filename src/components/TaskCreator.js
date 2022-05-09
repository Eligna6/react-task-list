import React, { useState } from "react";

export const TaskCreator = (props) => {
  const [newTaskName, setNewTaskName] = useState("");

  const updateNewTaskValue = (e) => setNewTaskName(e.target.value);

  const createNewTask = () => {
    if (!newTaskName) {
      window.alert("El nombre no puede estar vacío");
      setNewTaskName("");
      return;
    } else if (props.taskItems.find((t) => t.name === newTaskName)) {
      window.alert("Ya tienes una tarea con ese nombre");
      return;
    }
    props.callback(newTaskName);
    setNewTaskName("");
  };

  return (
    <div className="my-1 d-inline-flex justify-content-center">
      <input
        type="text"
        className="form-control mx-2"
        value={newTaskName}
        onChange={updateNewTaskValue}
      />
      <button type="submit" className="btn btn-primary" onClick={createNewTask}>
        Agregar
      </button>
    </div>
  );
};
