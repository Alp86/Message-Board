import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions";

import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./Header";

import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Chat from "./Chat";
import UsersOnline from "./UsersOnline";
import ForumsDashboard from "./forum/ForumsDashboard";
import Forum from "./forum/Forum";
import Thread from "./forum/Thread";

export default function App () {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const user = useSelector(
        state => state && state.user
    )


    return (
        <>
        <BrowserRouter>
        {user &&
            <div>
                <Header/>

                <Route
                    exact path="/"
                    component={Profile}
                />

                <Route
                     path="/user/:id"
                     render={props => (
                         <OtherProfile
                             key={props.match.url}
                             match={props.match}
                             history={props.history}
                         />
                     )}
                />

                <Route
                    path="/findpeople"
                    render={props => (
                        <FindPeople
                            history={props.history}
                        />
                    )}
                />

                <Route
                    path="/friends"
                    render={props => (
                        <Friends
                            history={props.history}
                        />
                    )}
                />

                <Route
                    path="/chat"
                    component={Chat}
                />

                <Route
                    path="/users-online"
                    render={props => (
                        <UsersOnline
                            history={props.history}
                        />
                    )}
                />

                <Route
                    exact path="/forums"
                    render={props => (
                        <ForumsDashboard
                            history={props.history}
                        />
                    )}
                />

                <Route
                    exact path="/forums/:forumId"
                    render={props => (
                        <Forum
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />

                <Route
                    path="/forums/:forumId/:threadId"
                    render={props => (
                        <Thread
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />

            </div>
            }
        </BrowserRouter>
        </>
    );

}
