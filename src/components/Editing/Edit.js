import React, { useState } from "react";
import "./Edit.css";

const EditComponent = (props) => {
  const [newText, setFormInput] = useState("");
  const updateText = (event) => {
    setFormInput(event.target.value);
  };

  function updateGoalText() {
    props.onNewText(newText);
  }

  return (
    <>
      <div className="edit-container">
        <textarea
          className="edit-input"
          defaultValue={props.value}
          onChange={updateText}
        ></textarea>
      </div>
      <button className="editBtn" onClick={updateGoalText}>
        Save
      </button>
    </>
  );
};

export default EditComponent;
