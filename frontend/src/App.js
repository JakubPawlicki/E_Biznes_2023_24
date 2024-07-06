import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedPage from './components/ProtectedPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import LoginGoogle from "./components/LoginGoogle";
import LoginGithub from "./components/LoginGithub";

const App = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/loginGoogle" element={<LoginGoogle />} />
                <Route path="/loginGithub" element={<LoginGithub />} />
                <Route path="/register" element={<Register />} />
                <Route path="/protected" element={<PrivateRoute component={ProtectedPage} />} />
            </Routes>
        </Router>
    );
};

export default App;
