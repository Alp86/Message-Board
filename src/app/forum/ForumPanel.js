import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export default function ForumPanel(props) {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                padding: theme.spacing(2),
                width: theme.spacing(props.width),
                height: theme.spacing(props.height),
            },
        },
    }));
    const classes = useStyles();

    const [elevation, setElevation] = useState(3);
    const onMouseOver = () => {setElevation(10);};
    const onMouseOut = () => {setElevation(3);};

    return (
        <div className={classes.root}>
            <Paper elevation={elevation}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                children={props.children}
            />
        </div>
    );
}
