import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskContext } from "../contexts/TaskContext.jsx";
import TaskCard from "../components/TaskCard";

const statuses = ["To Do", "In Progress", "Done"];

const TaskBoard = () => {
  const { tasks, createTask, updateTask } = useContext(TaskContext);
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "" });

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ ...form, status: "To Do" });
    setForm({ title: "", description: "", assignedTo: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Board</h2>

      {/* New Task Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Task</button>
      </form>

      {/* Task Board Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: "30%",
                    minHeight: "400px",
                    border: "1px solid gray",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <h3>{status}</h3>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable draggableId={task._id} index={index} key={task._id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;