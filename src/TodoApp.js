import React, { useState } from "react";
import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";
import "./App.css";
import EditComponent from "./components/Editing/Edit";
import MarkedDone from "./components/MarkedDone/MarkedDone";

const TodoApp = () => {
  const [courseGoals, setcourseGoals] = useState([
    { id: "cg1", text: "Finish the Course" },
    { id: "cg2", text: "Learn all about the Course Main Topic" },
    { id: "cg3", text: "Help other students in the Course Q&A" },
    { id: "cg4", text: "Build a complex fully featured application" },
  ]);

  const [editMode, setEditMode] = useState(false);

  const [textForEditing, setTextForEditing] = useState("");

  const [editId, setEditID] = useState(null);

  const [markedItems, setMarkedItem] = useState([]);

  const addNewGoalHandler = (newGoal) => {
    if (newGoal.text) {
      setcourseGoals((courseGoals) => {
        return courseGoals.concat(newGoal);
      });
    } else return null;
  };

  const editGoalHandler = (goalID) => {
    setEditMode(true);
    setEditID(goalID);
    setTextForEditing((textForEditing) => {
      textForEditing = courseGoals.filter((elem) => elem.id === goalID)[0].text;
      return textForEditing;
    });
  };

  const changeTextHandler = (newText) => {
    setEditMode(false);
    if (newText) {
      //make shallow copy so not directly mutating state
      let editedGoals = [...courseGoals];
      editedGoals.filter((elem) => elem.id === editId)[0].text = newText;
      setcourseGoals(editedGoals);
    }
  };

  const removeGoalHandler = (goalID) => {
    setcourseGoals((courseGoals) => {
      return courseGoals.filter((elem) => elem.id !== goalID);
    });
  };

  const completeGoalHandler = (goalID) => {
    let newlyMarked = courseGoals.filter((elem) => elem.id === goalID)[0];
    //remove from list
    setcourseGoals((courseGoals) => {
      return courseGoals.filter((elem) => elem.id !== goalID);
    });
    setMarkedItem((markedItems) => {
      let markedItemsCopy = [...markedItems];
      markedItemsCopy.push(newlyMarked);
      return markedItemsCopy;
    });
  };

  const bumpItemHandler = (goalID) => {
    let bumpedGoals = [...courseGoals];
    let bumpIndex = bumpedGoals.findIndex((elem) => elem.id === goalID);

    if (bumpIndex === 0) {
      return;
    } else {
      let bumpItem = bumpedGoals.splice(bumpIndex, 1)[0];
      let newIndex = bumpIndex - 1;
      bumpedGoals.splice(newIndex, 0, bumpItem);

      setcourseGoals(bumpedGoals);
    }
  };

  if (editMode)
    return (
      <EditComponent value={textForEditing} onNewText={changeTextHandler} />
    );

  return (
    <div className="course-goals">
      <NewGoal onAddGoal={addNewGoalHandler} />

      <GoalList
        onRemoveGoal={removeGoalHandler}
        goals={courseGoals}
        onEdit={editGoalHandler}
        onBump={bumpItemHandler}
        onComplete={completeGoalHandler}
      />
      <MarkedDone complete={markedItems} />
    </div>
  );
};

export default TodoApp;
