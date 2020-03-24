import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";

export default function Navigation(props) {

    const clickHandler = e => {
        e.preventDefault();
        props.history.push(`/forums/${props.match.params.forumId}/${props.match.params.threadTitle}.${props.match.params.threadId}/page-${e.target.value}`);
    }
    console.log(props);

    const sumFun = () => {

    }

    let pageNums = [];


    return (
        <>
        {
            props.currentPage = 1 &&
            2 <= props.numPages &&
            3 <= props.numPages &&
            <div>
                <span onClick={clickHandler}>1</span>
                <span onClick={clickHandler}>2</span>
                <span onClick={clickHandler}>3</span>
            </div>
        }

        </>
    )
}
