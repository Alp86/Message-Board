import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearThreads } from "../../actions";
import ForumPreview from "./ForumPreview";
import ForumPanel from "./ForumPanel";
import BreadCrumbsMenu from "./BreadCrumbsMenu";

export default function ForumsDashboard(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearThreads());
    },[])

    const forums = useSelector(state => state.forums);

    const clickHandler = id => {
        props.history.push(`/forums/${id}/page-1`);
    };

    return (
        <>
            <div className="forums">
                {forums && forums.map(forum => (
                    <ForumPanel
                        children={
                            <div className="forumCard clickable" onClick={() => clickHandler(forum.id)}>
                                <h1>{forum.title}</h1>
                                <div className="forumCard-stats">
                                    <span>Threads: {forum.threadCount}</span>
                                    <span>  </span>
                                    <span>Posts: {forum.postCount}</span>
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
        </>
    )
}
