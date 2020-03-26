import React, { useState, useEffect } from "react";

import { HashRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";
import { clearPosts } from "../../actions";

import Post from "./Post";
import ProfilePic from "../ProfilePic";
import PaginationControls from "./Pagination";
import ReplyBox from "./ReplyBox";
import ReplyButton from "./ReplyButton";
import LinkIcon from '@material-ui/icons/Link';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Thread(props) {
    const classes = useStyles();

    const usersOnline = useSelector(
        state => state && state.usersOnline
    );

    const dispatch = useDispatch();
    console.log("props.match.params", props.match.params);

    useEffect(() => {
        let offset = props.match.params.threadPage * 10 - 10;
        socket.emit("getPostsByThreadId", {
            threadId: props.match.params.threadId,
            offset: offset
        });

        window.scrollTo(0, 0);

        return () => {
            dispatch(clearPosts());
        }
    }, [props.match.params]);

    const posts = useSelector(state => state.posts);
    const numPosts = useSelector(state => state.posts && state.posts[0] && state.posts[0].totalPosts);

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
                    width={100}
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

                                    <div className="post-content">
                                        {post.quoted_posts && post.quoted_posts.map(quote => (

                                                    <ExpansionPanel>
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <div className="quote-info">
                                                                <span>{quote.first} {quote.last} wrote on {dateFormat(quote.created_at)}</span>
                                                                <a href={quote.hashId}>
                                                                    <LinkIcon />
                                                                </a>
                                                            </div>
                                                        </ExpansionPanelSummary>

                                                        <ExpansionPanelDetails>
                                                            <div className="quote-content">{quote.content}</div>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>

                                        ))}
                                        <p>{post.content}</p>
                                    </div>
                                </div>

                            </div>

                            <ReplyButton
                                history={props.history}
                                match={props.match}
                                quoted_post={post}
                                hashId={`${props.match.url}#${index + props.match.params.threadPage * 10 - 9}`}
                            />

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

                                            // <Post
                                            //     width={50}
                                            //     children={
                                    //     }
                                    // />
