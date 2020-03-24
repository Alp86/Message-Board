import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePic from "./ProfilePic";
import { Link } from 'react-router-dom';
import Logout from "../welcome/Logout";

export default function Header () {

    const user = useSelector(
        state => state.user
    );

    return (
        <div className="header">

            <h1>Hang in there!</h1>

            <div className="header-link-container">

                <Link className="header-link" to="/forums">
                    <h3>Forums</h3>
                </Link>

                <Link className="header-link" to="/users-online">
                    <h3>See who&apos;s online</h3>
                </Link>

                <Link className="header-link" to="/chat">
                    <h3>Chat</h3>
                </Link>

                <Link className="header-link" to="/findpeople">
                    <h3>Find People</h3>
                </Link>

                <Link className="header-link" to="/friends">
                    <h3>Friends</h3>
                </Link>

                <Logout/>

                <Link to="/">
                    <ProfilePic
                        id={user.id}
                        first={user.first}
                        last={user.last}
                        url={user.url}
                    />
                </Link>
            </div>
        </div>
    );
}
