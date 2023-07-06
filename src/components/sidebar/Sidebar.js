import React, { useState, useEffect } from 'react'
import { signOut } from "firebase/auth"

import { CgLogOut } from "react-icons/cg"
import { AiFillHome } from "react-icons/ai"
import { IoIosPeople } from "react-icons/io"
import { RiUserSettingsLine } from "react-icons/ri"

import { auth } from "../../lib/firebase"
import { useAuth } from "../hooks/auth"
import defaultPhoto from "../../images/default_pfp.jpg"
import "./Sidebar.css"

export default function Sidebar() {
    const {user, isLoading} = useAuth()
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        if (window.innerWidth <= 768) 
            setIsMobile(true)
        else 
            setIsMobile(false)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
    })

    const logout = async () => {
        console.log("hello")
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) return 

    return (
        <div className="sidebar-container">
            <button className="title-button" onClick={async() => {
                window.location.href=`/dashboard`
            }}>{isMobile ? <AiFillHome/> : "Home"}</button>
            {!isMobile ? <div className="profile-container">
                <img className="profile-image" src={user.avatar ? user.avatar : defaultPhoto} alt="Profile Image"/>
                <h1 className="user-at">@{user.username}</h1>
            </div> : <img className="profile-image" src={user.avatar ? user.avatar : defaultPhoto} alt="Profile Image"/>}
            <button className="edit-profile-button" 
                onClick={async() => {
                    window.location.href=`/profile/${user.id}`
                }}>{isMobile ? <RiUserSettingsLine/> : "Edit Profile"}</button>
            <hr className="sidebar-hr"/>
            <button className="allusers-button" 
                onClick={(e) => {
                    e.preventDefault()
                    window.location.href = "/usersList"
            }}>{isMobile ? <IoIosPeople/> : "All Users"}</button>
            <div className="logout-button-container" 
                onClick={(e) => {
                    logout()
                    e.preventDefault()
                    window.location.href = "/"
                }}>
                {!isMobile && <h5 className="logout-text">Log out</h5>}
                <div className="logout-button">
                    <CgLogOut />
                </div>
            </div>
        </div>
    )
}

