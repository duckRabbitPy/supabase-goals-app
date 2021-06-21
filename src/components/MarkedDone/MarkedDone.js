import React from "react";
import "./MarkedDone.css";

const MarkedDone = (props) => {
  let markedListCopy = [...props.complete];
  let mostRecent = markedListCopy.slice(-3).reverse();
  if (markedListCopy.length > 0) {
    return (
      <ul className="done-list">
        <h4 className="recentHeader">Recent activity</h4>
        {mostRecent.map((item) => {
          return (
            <li key={item.id}>
              {"✓  "}
              {item.text}
            </li>
          );
        })}
      </ul>
    );
  } else return null;
};

export default MarkedDone;
