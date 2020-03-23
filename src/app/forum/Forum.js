import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  } from "../../actions";
import { socket } from "../../socket";
import ThreadPanel from "./ThreadPanel";

export default function Forum(props) {

    // get threads
    useEffect(() => {
        socket.emit("getThreads", props.match.params.forumId);
    },[])

    const threads = useSelector(state => state.threads);

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

    const clickHandler = id => {
        props.history.push(`/forums/${props.match.params.forumId}/${id}`);
    };

    return (
        <>
        {threads && threads.map(thread => (
            <ThreadPanel
                children={
                    <div onClick={() => clickHandler(thread.id)}>
                        <h3>{thread.title}</h3>
                        <span>Started by {thread.first} {thread.last} </span>
                        <span>on {dateFormat(thread.created_at)}  </span>
                        <span>Posts: {thread.numberOfPosts}</span>
                    </div>
                }
            />
        ))}
        </>
    )
}
