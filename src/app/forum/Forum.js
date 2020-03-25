import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  } from "../../actions";
import { socket } from "../../socket";
import ThreadPanel from "./ThreadPanel";
import PaginationControls from "./Pagination";

export default function Forum(props) {

    // get threads
    useEffect(() => {
        socket.emit("getThreadsByForumId", {
            forumId: props.match.params.forumId,
            firstThread: 1,
            lastThread: 10
        });
    },[])

    const threads = useSelector(state => state.threads);
    const numThreads = useSelector(state => state.threads && state.threads[0] && state.threads[0].highestThreadId)

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

    const clickHandler = thread => {
        props.history.push(`/forums/${props.match.params.forumId}/${thread.title.split(" ").join("-")}.${thread.id}/page-1`);
    };

    return (
        <>
        {threads && threads.map(thread => (
            <ThreadPanel
                children={
                    <div>
                        <h3 onClick={() => clickHandler({title: thread.title, id: thread.id})}>{thread.title}</h3>
                        <span>Started by {thread.first} {thread.last} </span>
                        <span>on {dateFormat(thread.created_at)}  </span>
                        <span>Posts: {thread.numberOfPosts}</span>
                        {thread.numberOfPosts > 10 &&
                            <PaginationControls
                                history={props.history}
                                match={props.match}
                                numPages={Math.ceil(thread.numberOfPosts / 10)}
                                currentPage={parseInt(props.match.params.pageNum)}
                                link={`/forums/${props.match.params.forumId}/${thread.title.split(" ").join("-")}.${thread.id}/page-`}
                            />
                        }
                    </div>
                }
            />
        ))}
        </>
    )
}
// ${thread.title.split(" ").join("-")}
