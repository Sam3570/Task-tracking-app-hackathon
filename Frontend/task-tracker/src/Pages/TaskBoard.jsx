// import React, { useContext, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { TaskContext } from "../contexts/TaskContext.jsx";
// import TaskCard from "../components/TaskCard";

// const statuses = ["To Do", "In Progress", "Done"];

// const TaskBoard = () => {
//   const { tasks, createTask, updateTask } = useContext(TaskContext);
//   const [form, setForm] = useState({ title: "", description: "", assignedTo: "" });

//   const handleDragEnd = (result) => {
//     const { destination, source, draggableId } = result;
//     if (!destination) return;
//     if (destination.droppableId !== source.droppableId) {
//       updateTask(draggableId, { status: destination.droppableId });
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createTask({ ...form, status: "To Do" });
//     setForm({ title: "", description: "", assignedTo: "" });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Task Board</h2>

//       {/* New Task Form */}
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="assignedTo"
//           placeholder="Assigned To"
//           value={form.assignedTo}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Create Task</button>
//       </form>

//       {/* Task Board Columns */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div style={{ display: "flex", justifyContent: "space-around" }}>
//           {statuses.map((status) => (
//             <Droppable droppableId={status} key={status}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   style={{
//                     width: "30%",
//                     minHeight: "400px",
//                     border: "1px solid gray",
//                     padding: "10px",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   <h3>{status}</h3>
//                   {tasks
//                     .filter((task) => task.status === status)
//                     .map((task, index) => (
//                       <Draggable draggableId={task._id} index={index} key={task._id}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                           >
//                             <TaskCard task={task} />
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default TaskBoard;



import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }


  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              tasks.map((task, index) => (
                <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex'>

                    <span className='font-medium'>Task #{index + 1}</span>

                    <Tooltip text={"Edit this task"} position={"top"}>
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete this task"} position={"top"}>
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>
                  <div className='whitespace-pre'>{task.description}</div>
                </div>
              ))

            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks