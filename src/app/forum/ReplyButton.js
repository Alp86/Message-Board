import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ReplyIcon from '@material-ui/icons/Reply';
import CancelIcon from '@material-ui/icons/Cancel';
import { newPost } from "../../actions";

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
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Reply(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [reply, setReply] = useState();
    const [replyEmpty, setReplyEmpty] = useState(true);

    const [visibility, setVisibility] = useState(false);


    const handleClick = e => {
        e.preventDefault();
        console.log(reply);
        // dispatch action
        dispatch(newPost({
            threadId: props.match.params.threadId,
            post: reply,
            quoted_posts: [{
                ...props.quoted_post,
                hashId: props.hashId
            }]
        }));
        setReply("");
        setVisibility(false);
    }

    return (
        <>
        <div className="reply">
            {visibility &&

                <div className={classes.root}>
                    <TextField
                        id="outlined-full-width"
                        label="Reply"
                        placeholder="enter your reply here"
                        style={{ margin: 8 }}
                        fullWidth
                        multiline
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        value={reply}
                        onChange={e => {
                            setReply(e.target.value);
                            if (e.target.value.trim() == "") {
                                setReplyEmpty(true);
                            } else {
                                setReplyEmpty(false);
                            }
                        }}
                    />
                    <div className="reply-buttons">
                        <Button
                            disabled={replyEmpty}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<ReplyIcon />}
                            onClick={handleClick}
                        >
                            Reply
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CancelIcon />}
                            onClick={() => {
                                setVisibility(false);
                                setReply("");
                            }}
                        >
                            Cancel Reply
                        </Button>
                    </div>
                </div>

            }

            {!visibility &&
            <div className="reply-buttons">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<ReplyIcon />}
                    onClick={() => setVisibility(true)}
                >
                Reply
                </Button>
            </div>

            }
            </div>
        </>
    );
}
