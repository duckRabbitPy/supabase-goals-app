import React, { useState } from "react";

import "./NewGoal.css";

const NewGoal = (props) => {
  const [formInput, setFormInput] = useState("");

  const updateState = (event) => {
    setFormInput(event.target.value);
  };

  const addGoalHandler = (event) => {
    event.preventDefault();
    const newGoal = {
      id: Math.random().toString(),
      text: formInput,
    };

    props.onAddGoal(newGoal);
    setFormInput("");
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input value={formInput} onChange={updateState} type="text" />
      <button className="addBtn" type="submit">
        Add Goal
      </button>
    </form>
  );
};

export default NewGoal;
