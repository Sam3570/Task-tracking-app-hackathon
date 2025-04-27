import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { TaskProvider, TaskContext } from "./contexts/TaskContext";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import TaskBoard from "./Pages/TaskBoard.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default App;