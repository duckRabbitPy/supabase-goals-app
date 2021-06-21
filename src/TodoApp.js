import React, { useState } from "react";
import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";
import "./App.css";
import EditComponent from "./components/Editing/Edit";
import MarkedDone from "./components/MarkedDone/MarkedDone";
import Save from "./components/Save";
import { supabase } from "./supabaseClient";

const TodoApp = () => {
  const [courseGoals, setcourseGoals] = useState([{ id: "jdk", msg: "hello" }]);

  const [editMode, setEditMode] = useState(false);

  const [textForEditing, setTextForEditing] = useState("");

  const [editId, setEditID] = useState(null);

  const [markedItems, setMarkedItem] = useState([]);

  async function collectDBState() {
    try {
      let { data, error } = await supabase.from("profiles").select("tasksDB");

      if (error) {
        throw error;
      }
      const retrievedState = data[0].tasksDB;
      setcourseGoals(retrievedState);
    } catch (error) {
      alert(error.message);
    }
  }

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

  async function UpdateDBHandler() {
    try {
      const updates = {
        tasksDB: courseGoals,
      };

      let { error } = await supabase.from("profiles").update(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  if (editMode)
    return (
      <EditComponent value={textForEditing} onNewText={changeTextHandler} />
    );
  if (courseGoals !== [])
    return (
      <div className="course-goals">
        <Save goals={courseGoals} onSavedChanges={UpdateDBHandler} />
        <NewGoal onAddGoal={addNewGoalHandler} />

        <GoalList
          onRemoveGoal={removeGoalHandler}
          goals={courseGoals}
          onEdit={editGoalHandler}
          onBump={bumpItemHandler}
          onComplete={completeGoalHandler}
        />
        <MarkedDone complete={markedItems} />
        <button onClick={collectDBState}>Retrieve</button>
      </div>
    );
};

export default TodoApp;
