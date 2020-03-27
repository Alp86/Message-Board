import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";
import { clearPosts } from "../../actions";


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Post from "./Post";
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

import axios from "../../axios";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));


export default function Thread(props) {
    const classes = useStyles();

    const user = useSelector(
        state => state && state.user
    );

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("new thread is running");

    }, []);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [titleError, setTitleError] = useState(false);
    const [textError, setTextError] = useState(false);

    const [titleEmpty, setTitleEmpty] = useState(true);
    const [textEmpty, setTextEmpty] = useState(true);

    const handleClick = e => {
        e.preventDefault();
        if (title.trim() == "") {
            setTitleError(true);
        }
        if (text.trim() == "") {
            setTextError(true);
        }
        if (!titleError && !textError) {
            // make post request to server
        (async () => {
            const { data } = await axios.post("/new-thread", {
                forumId: props.match.params.forumId,
                title: title,
                post: text
            });
            // data needs to contain thread title and id
            props.history.push(`/forums/${props.match.params.forumId}/${title.replace(/\W/g, ' ').split(" ").join("-")}.${data.threadId}/page-1`);
        })();

        }
    };

    return (
        <>
            <Post
                width={100}
                children={
                    <div className="new-thread-container">

                        <TextField
                            onChange={e => {
                                setTitle(e.target.value);
                                if (e.target.value.trim() == "") {
                                    setTitleEmpty(true);
                                } else {
                                    setTitleEmpty(false);
                                }
                            }}
                            error={titleError}
                            id="outlined-full-width"
                            label="*required"
                            style={{ margin: 8 }}
                            placeholder="Thread title"
                            helperText="please input title here"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />

                        <TextField
                            onChange={e => {
                                setText(e.target.value);
                                if (e.target.value.trim() == "") {
                                    setTextEmpty(true);
                                } else {
                                    setTextEmpty(false);
                                }
                            }}
                            error={textError}
                            id="outlined-full-width"
                            label="*required"
                            placeholder="Thread text"
                            helperText="please enter text here"
                            style={{ margin: 8 }}
                            fullWidth
                            multiline
                            rows="20"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />

                        <div className="reply-buttons">
                            <Button
                                disabled={titleEmpty || textEmpty}
                                onClick={handleClick}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<ReplyIcon />}
                            >
                                Post new thread
                            </Button>
                        </div>

                    </div>
                }
            />

        </>
    )
}


// <Editor
// apiKey="f9b649hw37r5ulk71ypcdixfn3nmzmge433uj8y1zlccekza"
// initialValue="<p>Initial content</p>"
// init={{
//     height: 500,
//     menubar: false,
//     plugins: [
//         'advlist autolink lists link image',
//         'charmap print preview anchor help',
//         'searchreplace visualblocks code',
//         'insertdatetime media table paste wordcount'
//     ],
//     toolbar:
//     'undo redo | formatselect | bold italic | \
//     alignleft aligncenter alignright | \
//     bullist numlist outdent indent | help'
// }}
// onChange={handleEditorChange}
// />
