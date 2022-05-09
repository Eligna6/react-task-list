import React from "react";

export const VisibilityControl = (props) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        id="showCompleted"
        className="btn-check"
        autocomplete="off"
        checked={props.isChecked}
        onChange={(e) => props.callback(e.target.checked)}
      />
      <label className="btn btn-outline-primary mx-2" htmlFor="showCompleted">
        Mostrar {props.description}
      </label>
    </div>
  );
};
