import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { socket } from "../../socket";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ReplyIcon from '@material-ui/icons/Reply';
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

    const [reply, setReply] = useState();

    const dispatch = useDispatch();

    const handleClick = e => {
        e.preventDefault();
        console.log(reply);
        // dispatch action
        dispatch(newPost({
            threadId: props.match.params.threadId,
            post: reply
        }));
        setReply("");
    }

    return (
        <>
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
                    onChange={e => setReply(e.target.value)}
                />
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<ReplyIcon />}
              onClick={handleClick}
            >
            Reply to thread
            </Button>
        </>
    );
}
