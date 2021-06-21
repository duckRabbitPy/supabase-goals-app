import React from "react";

const Save = (props) => {
  function userSaved() {
    props.onSavedChanges();
  }
  return (
    <button
      className={!props.retrieve ? "disabled-btn" : "get-changes"}
      onClick={userSaved}
      disabled={!props.retrieve}
    >
      Save changes
    </button>
  );
};

export default Save;
