import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUserImage } from "../actions";

export default function(props) {

    const dispatch = useDispatch();

    const user = useSelector(
        state => state.user
    );

    function readFile(e) {
        const file = e.target.files[0];

        var formData = new FormData();
        formData.append("id", user.id);
        formData.append("file", file);

        dispatch(setUserImage(formData));
        props.closeUploader();
    }

    // function submit(formData) {
    //     axios.post("/user-image", formData)
    //         .then( ({data}) => {
    //             console.log("response from POST /user-image:", data);
    //             setImage(data.url);
    //             // dispatch(imageChange( {userId: id, url: data.url} ));
    //             closeUploader();
    //         })
    //         .catch(error => console.log("error in POST /user-image", error));
    // }

    return (
        <div>
            <div onClick={props.closeUploader} id="modal-overlay"></div>

            <div id="uploader-container">
                <div id="uploader-close-container">
                    <span onClick={props.closeUploader} id="uploader-close-button">X</span>
                </div>
                <input onChange={readFile} type="file" name="file" id="file" className="inputfile" />
                <label id="select-image" htmlFor="file">select image</label>
            </div>

        </div>
    );
}
