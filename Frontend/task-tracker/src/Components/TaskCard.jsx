import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div style={{
      border: "1px solid lightgray",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#f9f9f9",
    }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Assigned to: {task.assignedTo}</small>
    </div>
  );
};

export default TaskCard;