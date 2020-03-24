import React, { useState, useEffect } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";
import Post from "./Post";
import ProfilePic from "../ProfilePic";

export default function Thread(props) {
    const usersOnline = useSelector(
        state => state && state.usersOnline
    );

    console.log("threadId:", props.match.params.threadId);

    useEffect(() => {
        socket.emit("getPostsByThreadId", props.match.params.threadId);
    },[]);

    const posts = useSelector(state => state.posts);

    const dateFormat = dateStr => {
        const [year, month, day] = dateStr.split("T")[0].split("-");
        const [hours, minutes, seconds] = dateStr.split("T")[1].split(".")[0].split(":");
        const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true, timeZone: 'Europe/Berlin'
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <>
            {posts && posts.map((post, index) => (
                <Post
                    children={
                        <div id={index+1} className="post-container">
                            <div className="post-user">
                                <ProfilePic
                                    id={post.poster_id}
                                    url={post.url}
                                    first={post.first}
                                    last={post.last}

                                />
                                <span>{post.first} {post.last}</span>
                                <span>{dateFormat(post.created_at)}</span>
                            </div>
                            <div className="post-content">{post.content}</div>
                            <div>
                                <a href={`#${index+1}`} >
                                    #{index+1}
                                </a>
                            </div>
                        </div>
                    }
                />
            ))}
        </>
    )
}
// {`/forums/${props.match.params.forumId}/${props.match.params.threadId}/#${post.id}`}
// <Link to={`/forums/${props.match.params.forumId}/${props.match.params.threadId}/#post${post.id}`}>
// #{index+1}
// </Link>
