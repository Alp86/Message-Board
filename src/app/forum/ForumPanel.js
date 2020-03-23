import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            padding: theme.spacing(2),
            width: theme.spacing(60),
            height: theme.spacing(20),
        },
    },
}));

export default function ForumPanel(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3}
                children={props.children}
            />
        </div>
    );
}
