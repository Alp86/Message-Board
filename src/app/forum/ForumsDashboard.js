import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearThreads } from "../../actions";
import ForumPreview from "./ForumPreview";
import ForumPanel from "./ForumPanel";

export default function ForumsDashboard(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearThreads());
    },[])

    const forums = useSelector(state => state.forums);

    const clickHandler = id => {
        props.history.push(`/forums/${id}`);
    };

    return (
        <>
            <div id="forums">
                {forums && forums.map(forum => (
                    <ForumPanel
                        children={
                            <div className="forumCard" onClick={() => clickHandler(forum.id)}>
                                <h1>{forum.title}</h1>
                                <div className="forumCard-stats">
                                    <span>Threads: {forum.numberOfThreads}</span>
                                    <span>  </span>
                                    <span>Posts: {forum.numberOfPosts}</span>
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
        </>
    )
}


// <ForumPreview
// key={forum.id}
// forumId={forum.id}
// title={forum.title}
// threads={forum.numberOfThreads}
// posts={forum.numberOfPosts}
// history={props.history}
// />
