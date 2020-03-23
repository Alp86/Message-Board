import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";

export default function Thread(props) {

    console.log("threadId:", props.match.params.threadId);

    useEffect(() => {
        socket.emit("getPostsByThreadId", props.match.params.threadId);
    },[]);

    const posts = useSelector(state => state.posts);

    return (
        <>
            {posts && posts.map(post => (
                <div key={post.id}>
                    <p>{post.first} {post.last}</p>
                    <p>{post.content}</p>
                </div>
            ))}
        </>
    )
}
