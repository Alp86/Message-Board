import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationControls(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(props.currentPage);
    const handleChange = (event, value) => {
        setPage(value);
        if (props.link) {
            props.history.push(`${props.link}${value}`);
        } else {
            props.history.push(`/forums/${props.match.params.forumId}/${props.match.params.threadTitle}.${props.match.params.threadId}/page-${value}`);
        }
    };



    return (
        <div className={`${classes.root} paginationControls`}>
            <Pagination
                count={props.numPages}
                page={page}
                siblingCount={2}
                hidePrevButton={props.hidePrevNext}
                hideNextButton={props.hidePrevNext}
                color="primary"
                onChange={handleChange}
            />
        </div>
    );
}
