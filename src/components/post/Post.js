import React from "react"
import { formatDistanceToNow } from "date-fns"

import {
    FaRegHeart,
    FaHeart,
    FaComment,
    FaRegComment,
    FaTrash,
} from "react-icons/fa"

import {useUser} from "../hooks/users"
import {useDeletePost, useToggleLike} from "../hooks/posts"
import {useComments} from "../hooks/comments"
import defaultPhoto from "../../images/default_pfp.jpg"
import "./Post.css"

export default function Post({ post, authUser }) {
    const {user, isLoading} = useUser(post.uid)
    const {deletePost, postLoading} = useDeletePost(post.id)
    const { comments, isLoading: commentsLoading } = useComments(post.id)

    const isLiked = post.likes.includes(authUser?.id)

    const { toggleLike, isLoading: likeLoading } = useToggleLike({id: post.id, isLiked, uid: authUser.id})

    if (isLoading || postLoading || commentsLoading) return

    return(
        <div className="post-container">
            <div className="post-header-container">
                <img className="profile-pic" src={user.avatar ? user.avatar : defaultPhoto} alt="Profile Image"/>
                <div className="username-timeago-container">
                    <h1 className="username-text" onClick={async() => {
                        window.location.href=`/profile/${user.id}`
                    }}>{user.username}</h1>
                    <h1 className="time-text">{formatDistanceToNow(post.date)} ago</h1>
                </div>
            </div>
            <h1 className="post-text">{post.text}</h1>
            <div className="likes-comments-container">
                <div className="like-comment-button-container" onClick={async() => {
                        window.location.href=`/comments/${post.id}`
                }}>
                    {comments?.length ? <FaComment/> : <FaRegComment/>}
                </div>
                {comments?.length > 0 ? <h1 className="like-comment-text">{comments?.length}</h1> : null}
                <div className="like-comment-button-container" style={{color: isLiked ? "red" : "black"}} onClick={toggleLike}>
                    {isLiked ? <FaHeart/> : <FaRegHeart/>}
                </div>
                {post?.likes.length > 0 ? <h1 className="like-comment-text">{post.likes.length}</h1> : null}
                {post.uid === authUser.id && 
                    <div className="trash-icon" onClick={deletePost}>
                        <FaTrash/>
                    </div>
                }
            </div>
        </div>
    )
}