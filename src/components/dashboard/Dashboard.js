import React, { useState } from "react"

import { useAddPost, usePosts } from "../hooks/posts";
import { useAuth } from "../hooks/auth";
import Post from "../post/Post"
import "./Dashboard.css"

export default function Dashboard(){
    const [postText, setPostText] = useState("")

    const { user, isLoading: authLoading } = useAuth();
    const { addPost, isLoading: addingPost } = useAddPost();
    const { posts, isLoading: postLoading } = usePosts()

    if (authLoading || addingPost || postLoading) return "loading..."

    function handleAddPost() {
        addPost({
            uid: user.id,
            text: postText,
        })
        setPostText("")
    }

    function postsListItems(){
        return(
            <div className="posts-list">
                {posts?.length === 0 ? 
                    <h1>Wow, Such Empty</h1> :
                    posts?.map(post => <Post key={post.id} post={post} authUser={user}/>)
            }
            </div>
        )
    }
    
    return(
        <div className="dashboard-container">
            <div className="new-post-container">
                <div className="new-post-title-container">
                    <h1 className="new-post-title">New Post</h1>
                    <button className="new-post-button" onClick={handleAddPost}>Post</button>
                </div>
                <textarea className="new-post-input" placeholder="Create a new post..." onChange={(e) => setPostText(e.target.value)} value={postText}/>
            </div>
            {postsListItems()}
        </div>
    )
}