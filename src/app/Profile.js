import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import Uploader from "./Uploader";

export default function() {

    const user = useSelector(
        state => state.user
    );
    const [uploaderVisible, setUploaderVisibility] = useState(false);

    return (
        <div className="profile">
            <p>{user.first} {user.last}</p>

            <ProfilePic
                {...user}
                clickHandler={() => setUploaderVisibility(true)}
            />

            <BioEditor
                bio={user.bio}
            />
            {uploaderVisible &&
                <Uploader
                    closeUploader={() => setUploaderVisibility(false)}
                />
            }
        </div>
    );
}
