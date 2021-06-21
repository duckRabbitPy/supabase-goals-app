import React from "react";
import "./GoalList.css";

const GoalList = (props) => {
  function removeElem(event) {
    const idForRemoval = event.target.value;
    props.onRemoveGoal(idForRemoval);
  }

  function editElem(event) {
    props.onEdit(event.target.value);
  }

  function bumpElem(event) {
    props.onBump(event.target.value);
  }

  function completeElem(event) {
    const idForCompletion = event.target.value;
    props.onComplete(idForCompletion);
  }

  return (
    <ul className="goal-list">
      {props.goals.map((goal, index) => {
        return (
          <li key={goal.id} id={index === 0 ? "priority" : null}>
            <label className="goal-text">{goal.text}</label>
            <div className="btn-container">
              <button
                id="edit-btn"
                className="controls"
                value={goal.id}
                onClick={editElem}
              >
                Edit
              </button>
              <button
                id="remove-btn"
                className="controls"
                value={goal.id}
                onClick={removeElem}
              >
                Remove
              </button>
              <button
                id="bump-btn"
                className="controls"
                value={goal.id}
                onClick={bumpElem}
              >
                {"\u2B06"}
              </button>
              <button
                id="complete-btn"
                className="controls"
                value={goal.id}
                onClick={completeElem}
              >
                Mark as Done
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GoalList;
