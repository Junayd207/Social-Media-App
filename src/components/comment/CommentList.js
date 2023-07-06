import React, { useState } from "react"
import { useParams } from "react-router-dom"

import { usePost } from "../hooks/posts"
import { useAuth } from "../hooks/auth"
import { useAddComment, useComments } from "../hooks/comments"
import Post from "../post/Post"
import Comment from "./Comment"
import defaultImage from "../../images/default_pfp.jpg"
import "./CommentList.css"

export default function CommentList(){
    const [commentText, setCommentText] = useState("")

    const { id } = useParams();
    const { post, isLoading: postLoading } = usePost(id);
    const { user, isLoading: authLoading } = useAuth();
    const { addComment, isLoading : commentLoading} = useAddComment({postID: id, uid: user?.id});
    const { comments, isLoading: commentsLoading} = useComments(id)

    if (postLoading || authLoading || commentLoading || commentsLoading) return

    const commentsElements = comments.map(comment => (
        <Comment comment={comment} key={comment.id} authUser={user}/>
    ))

    return(
        <div className="comments-page-container">
            <Post key={post.id} post={post} authUser={user}/>
            <div className="add-comment-container">
                <div className="add-comment-section-container">
                    <img className="add-comment-image" src={user.avatar ? user.avatar : defaultImage} alt="Profile Image"/>
                    <input className="add-comment-input" placeholder="Write comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                </div>
                <button className="add-comment-button" onClick={() => {addComment(commentText) ;setCommentText("")}}>Add Comment</button>
            </div>
            {commentsElements}
        </div>
    )
}