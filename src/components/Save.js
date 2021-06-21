import React from "react";

const Save = (props) => {
  function userSaved() {
    props.onSavedChanges();
  }
  return (
    <button className="get-changes" onClick={userSaved}>
      Save changes
    </button>
  );
};

export default Save;
