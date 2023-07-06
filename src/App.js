import React from "react"
import { Routes, Route } from "react-router-dom"

import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Dashboard from "./components/dashboard/Dashboard"
import Sidebar from "./components/sidebar/Sidebar"
import CommentList from "./components/comment/CommentList"
import UsersList from "./components/users/UsersList"
import Profile from "./components/profile/Profile"
import "./App.css"

export default function App() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/dashboard" element={
                    <div className="main-container">
                        <Sidebar/>
                        <Dashboard/>
                    </div>
                }/>
                <Route path="/comments/:id" element={
                    <div className="main-container">
                        <Sidebar/>
                        <CommentList/>
                    </div>
                }/>
                <Route path="/usersList" element={
                    <div className="main-container">
                        <Sidebar/>
                        <UsersList/>
                    </div>
                }/>
                <Route path="/profile/:id" element={
                    <div className="main-container">
                        <Sidebar/>
                        <Profile/>
                    </div>
                }/>
            </Routes>
        </main>
    );
}

