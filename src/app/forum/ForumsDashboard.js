import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  } from "../../actions";
import ForumScreen from "./ForumScreen";

export default function ForumsDashboard() {

    // receive forums
    const forumsData = useSelector(state => state.forumsDashboard);

    return (
        <>
        <div>
            {forumsData && forumsData.map(forum => (
                <div key={forum.id}>
                    <h3>{forum.title}</h3>
                    <h4>Threads: {forum.numberOfThreads}</h4>
                    <h4>Posts: {forum.numberOfPosts}</h4>
                </div>
            ))}
        </div>
        </>
    )
}
