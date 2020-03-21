import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function() {

    const user = useSelector(
        state => state.user
    );

    return (
        <div className="profile">
            <p>{user.first} {user.last}</p>

            <ProfilePic
                {...user}
            />

            <BioEditor
                bio={user.bio}
            />
        </div>
    );
}
