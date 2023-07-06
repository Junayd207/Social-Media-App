import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

import { AiFillCloseSquare } from "react-icons/ai"

import { usePosts } from "../hooks/posts"
import { useUser, useUpdateAvatar  } from "../hooks/users"
import { useAuth  } from "../hooks/auth"
import Post from "../post/Post"
import defaultImage from "../../images/default_pfp.jpg"
import "./Profile.css"

export default function Profile() {
    const { id } = useParams()

    const { user, isLoading: userLoading } = useUser(id)
    const { user: authUser, isLoading: authLoading } = useAuth()
    const { posts, isLoading: postsLoading } = usePosts(id)
    const { setFile, 
            updateAvatar, 
            isLoading: fileLoading, 
            fileURL 
        } = useUpdateAvatar(authUser?.id)

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    function handleChange(e) {
        setFile(e.target.files[0])
    }

    if (userLoading || authLoading || postsLoading || fileLoading) return "Loading..."

    const popupMenu = 
        <div className="popup-menu">
            <div className="popup-content">
                <div className="popup-title-container">
                    <h1 className="popup-title">Edit Profile</h1>
                    <div className="popup-exit-button" onClick={handleToggle}>
                        <AiFillCloseSquare/>
                    </div>
                </div>
                <div className="popup-avatar-change-container">
                    <img className="popup-profile-image" src={fileURL ? fileURL : authUser.avatar ? authUser.avatar : defaultImage}  alt="Profile Image"/>
                    <div className="container">
                        <h1 className="popup-change-avatar-text">Change Avatar</h1>
                        <input type="file" accept="image/*" onChange={handleChange}/>
                    </div>
                </div>
                <button className="popup-save-button" onClick={updateAvatar}>Save</button>
            </div>
        </div>
    
    return(
        <div>
            <div className="profile-page-container">
                <img className="profile-page-image" src={user.avatar ? user.avatar : defaultImage} alt="Profile Image"/>
                <div className="profile-page-content-container">
                    <div className="profile-page-username-changeavatar-container">
                        <h1 className="profile-page-username">{user.username}</h1>
                        {authUser.id === user.id && <button className="profile-page-changeavatar-button" onClick={handleToggle}>Change Avatar</button>}
                    </div>
                    <div className="profile-page-stats-container">
                        <h1 className="profile-page-posts-total">Posts: {posts.length}</h1>
                        <h1 className="profile-page-join-date">Joined: {format(user.date, "MMMM YYY")}</h1>
                    </div>
                </div>
            </div>
            <hr className="profile-page-hr"/>
            <div className="profile-page-posts-list">
                {posts?.length === 0 ? 
                    <h1>Wow, Such Empty</h1> :
                        posts?.map(post => <Post key={post.id} post={post} authUser={authUser}/>)}
            </div>
            {isOpen && popupMenu}
        </div>
    )
}