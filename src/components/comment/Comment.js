import React from "react"
import { formatDistanceToNow } from "date-fns"

import { FaTrash } from "react-icons/fa"

import { useUser } from "../hooks/users"
import { useDeleteComment } from "../hooks/comments"
import defaultImage from "../../images/default_pfp.jpg"
import "./Comment.css"

export default function Comment({comment, authUser}){
    const { user, isLoading: userLoading } = useUser(comment.uid)
    const { deleteComment, isLoading: deleteLoading} = useDeleteComment(comment.id)

    if (deleteLoading || userLoading) return

    return(
        <div className="comment-container" key={comment.id}>
            <img className="comment-image" src={user.avatar ? user.avatar : defaultImage} alt="Profile Image"/>
            <div className="comment-sub-container">
                <div className="comment-title-container">
                    <h1 className="comment-username">{user.username}</h1>
                    {authUser.id === user.id && <div className="trash-icon" onClick={deleteComment}>
                        <FaTrash/>
                    </div>}
                </div>
                <h1 className="comment-timeago">{formatDistanceToNow(comment.date)} ago</h1>
                <hr className="comment-hr"/>
                <h1 className="comment-text">{comment.text}</h1>
            </div>
        </div>
    )
}
