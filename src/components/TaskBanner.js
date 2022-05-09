import React from "react";

export const TaskBanner = (props) => (
  <h2 className="bg-primary text-white text-center p-4">
    {props.username}'s Tasks ~&nbsp;
    <em>
      ({props.taskItems.filter((t) => !t.done).length}
      {props.taskItems.filter((t) => !t.done).length === 1
        ? ` tarea pendiente`
        : ` tareas pendientes`})
    </em>
  </h2>
);
