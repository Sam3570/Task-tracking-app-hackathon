import React from 'react';
import Home from './Pages/Home';
import Navigation from './Components/Navigation';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Footer from './Components/Footer';
import LoginPage from './Pages/Login';
import SignUp from './Pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //yeh sara to remove nhi hoga?

import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { TaskProvider, TaskContext } from "./contexts/TaskContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskBoard from "./pages/TaskBoard";

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