import React, { useState, useEffect } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";
import Post from "./Post";
import ProfilePic from "../ProfilePic";
import PaginationControls from "./Pagination";
import ReplyBox from "./ReplyBox";
import ReplyButton from "./ReplyButton";

export default function Thread(props) {
    const usersOnline = useSelector(
        state => state && state.usersOnline
    );

    console.log("props.match.params", props.match.params);

    useEffect(() => {
        let offset = props.match.params.threadPage * 10 - 10;
        socket.emit("getPostsByThreadId", {
            threadId: props.match.params.threadId,
            offset: offset
        });

        window.scrollTo(0, 0);
    }, [props.match.params]);

    const posts = useSelector(state => state.posts);
    const numPosts = useSelector(state => state.posts && state.posts[0] && state.posts[0].totalPosts);

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

    const checkOnlineStatus = posterId => {
        let onlineStatus = "offline";
        usersOnline.map(user => {
            if (posterId === user.id) {
                onlineStatus = "online"
            }
        })
        return onlineStatus;
    };

    return (
        <>
            <h1>{props.match.params.threadTitle.split("-").join(" ")}</h1>

            {numPosts && numPosts > 1 &&
                <PaginationControls
                    history={props.history}
                    match={props.match}
                    numPages={Math.ceil(numPosts / 10)}
                    currentPage={parseInt(props.match.params.threadPage)}
                />
            }

            {posts && posts.map((post, index) => (
                <Post
                    children={

                        <div id={index + props.match.params.threadPage * 10 - 9} className="post-container">

                            <div className="post-user-and-content-container">

                                <div className="post-user">
                                    <ProfilePic
                                        id={post.poster_id}
                                        url={post.url}
                                        first={post.first}
                                        last={post.last}

                                    />
                                    <span>{post.first} {post.last}</span>
                                    <span className={`online-status ${checkOnlineStatus(post.poster_id)}`}></span>
                                </div>

                                <div className="post-content-container">

                                    <div className="post-info">
                                        <span>{dateFormat(post.created_at)}</span>
                                        <a href={`#${index + props.match.params.threadPage * 10 - 9}`}>
                                            #{index + props.match.params.threadPage * 10 - 9}
                                        </a>
                                    </div>

                                    <div className="post-content">{post.content}</div>
                                </div>

                            </div>

                            <ReplyButton />

                        </div>
                    }
                />
            ))}

            {numPosts && numPosts > 1 &&
                <PaginationControls
                    history={props.history}
                    match={props.match}
                    numPages={Math.ceil(numPosts / 10)}
                    currentPage={parseInt(props.match.params.threadPage)}
                />
            }
            <ReplyBox
                history={props.history}
                match={props.match}
            />
        </>
    )
}
