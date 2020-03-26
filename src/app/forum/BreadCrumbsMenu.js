import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const useStyles = makeStyles(theme => ({
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));


export default function BreadCrumbsMenu(props) {

    function handleClick(e) {
        e.preventDefault();
        console.info('You clicked a breadcrumb.', props.match);
        if (e.target.text === "Forums") {
            props.history.push("/forums");
        }
    }

    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb">

            <Link
                color="inherit"
                href="/forums"
                onClick={handleClick}
                className={classes.link}
            >
                <HomeIcon className={classes.icon} />
                Forums
            </Link>
            
        </Breadcrumbs>
    );
}
