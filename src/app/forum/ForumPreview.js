import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearThreads } from "../../actions";
import { socket } from "../../socket";

export default function ForumPreview(props) {
    const dispatch = useDispatch();

    const clickHandler = id => {
        dispatch(clearThreads());
        socket.emit("getThreads", id);
        props.history.push(`/forums/${id}`);
    };

    return (
        <>
        <div className="forumCard" onClick={() => clickHandler(props.forumId)}>
            <h1>{props.title}</h1>
            <div className="forumCard-stats">
                <p>Threads: {props.threads}</p>
                <p>Threads: {props.posts}</p>
            </div>
        </div>
        </>
    )
}
