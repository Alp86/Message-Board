import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export default function Post(props) {

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                padding: theme.spacing(1),
                width: theme.spacing(props.width),
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3}
                children={props.children}
            />
        </div>
    );
}
