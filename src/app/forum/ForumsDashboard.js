import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearThreads } from "../../actions";
import ForumPreview from "./ForumPreview";
import ForumPanel from "./ForumPanel";
import BreadCrumbsMenu from "./BreadCrumbsMenu";
import Post from "./Post";
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import SettingsIcon from '@material-ui/icons/Settings';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import LinkIcon from '@material-ui/icons/Link';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const dateFormat = dateStr => {
    const [year, month, day] = dateStr.split("T")[0].split("-");
    const [hours, minutes, seconds] = dateStr.split("T")[1].split(".")[0].split(":");
    const date = new Date(Date.UTC(year, `${parseInt(month)-1}`, day, hours, minutes));
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true, timeZone: 'Europe/Berlin'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default function ForumsDashboard(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearThreads());
    },[])

    const forums = useSelector(state => state.forums);
    const topTenThreads = useSelector(state => state.topTenThreads);

    const forumClick = id => {
        props.history.push(`/forums/${id}/page-1`);
    };

    const threadClick = thread => {
        const page = Math.ceil(thread.postCount / 10);
        props.history.push(`/forums/${thread.forum_id}/${thread.title.replace(/\W/g, ' ').split(" ").join("-")}.${thread.thread_id}/page-${page}`);
    };

    return (
        <>
            <div className="forums-dashboard">
                <div className="forums">
                    {forums && forums.map(forum => (
                        <ForumPanel
                            width={60}
                            height={12}
                            children={
                                <div className="forumCard clickable" onClick={() => forumClick(forum.id)}>
                                    {forum.title === "Bouldering" &&
                                        <h1><FilterHdrIcon fontSize="large"/> {forum.title}</h1>
                                    }
                                    {forum.title === "Strength & Conditioning" &&
                                        <h1><FitnessCenterIcon fontSize="large"/> {forum.title}</h1>
                                    }
                                    {forum.title === "Nutrition" &&
                                        <h1><RestaurantIcon fontSize="large"/> {forum.title}</h1>
                                    }
                                    {forum.title === "Gear" &&
                                        <h1><LinkIcon fontSize="large"/> {forum.title}</h1>
                                    }
                                    {forum.title === "Off-topic" &&
                                        <h1><NotInterestedIcon fontSize="large"/> {forum.title}</h1>
                                    }

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
                <div className="top-ten-threads">
                    <h1><WhatshotIcon /> Hot Threads</h1>
                    {topTenThreads && topTenThreads.map(thread => (
                        <ForumPanel
                            width={60}
                            height={12}
                            children={
                                <div className="clickable" onClick={() => threadClick(thread    )}>
                                    <h3>{thread.title}</h3>
                                    <span>Last post: {dateFormat(thread.lastpost)} </span>
                                    <span>Posts: {thread.postCount} </span>
                                    <span> </span>
                                </div>
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
