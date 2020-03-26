import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from "../actions";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

export default function BioEditor () {
    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();
    const bio = useSelector(
        state => state.user && state.user.bio
    );

    const [currentbio, setBio] = useState(bio);
    const [visibility, setVisibility] = useState(false);
    const [bioChanged, setBioChanged] = useState(false);

    const dispatch = useDispatch();

    const submitBio = e => {
        e.preventDefault();
        if (currentbio.trim() != bio ) {
            dispatch(updateBio(currentbio));
        }
        setVisibility(false);
    };

    return (
        <div id="bio-editor">
            {!visibility && currentbio &&
                <div>
                    <p>{currentbio}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<EditIcon />}
                        onClick={() => setVisibility(true)}
                    >
                        edit bio
                    </Button>
                </div>
            }

            {!visibility && !currentbio &&
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<EditIcon />}
                        onClick={() => setVisibility(true)}
                    >
                        add bio
                    </Button>
                </div>
            }

            {visibility &&
                <div>
                    <textarea
                        value={currentbio}
                        onChange={ e => {
                            if (e.target.value.trim() != bio) {
                                setBioChanged(true);
                            } else {
                                setBioChanged(false);
                            }
                            setBio(e.target.value);
                        }}
                        placeholder="please enter your bio here"
                        rows="5" cols="30"
                    ></textarea>
                    <Button
                        disabled={!bioChanged}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={submitBio}
                    >
                        save bio
                    </Button>
                </div>
            }
        </div>
    );
}
