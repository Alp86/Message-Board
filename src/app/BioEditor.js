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
    )

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

// export default class BioEditor extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.uploadBio = this.uploadBio.bind(this);
//         this.updateBio = this.updateBio.bind(this);
//         this.toggleEditor = this.toggleEditor.bind(this);
//         this.openEditor = this.openEditor.bind(this);
//     }
//
//     componentDidMount() {
//         console.log("bioEditor has mounted");
//         this.setState({
//             bioEditorIsVisible: false,
//             bio: this.props.bio
//         });
//     }
//
//     uploadBio(e) {
//         e.preventDefault();
//         axios.post("/updatebio", {bio: this.state.bio})
//             .then( ({data}) => {
//                 this.toggleEditor();
//                 console.log("POST /bio response:", data.bio);
//                 this.props.setBio(data.bio);
//             })
//             .catch(error => console.log("error in uploadBio:", error));
//     }
//
//     updateBio(e) {
//         e.preventDefault();
//         this.setState({
//             bio: e.target.value
//         };
//     }
//
//     toggleEditor() {
//         this.setState({
//             bioEditorIsVisible: !this.state.bioEditorIsVisible
//         });
//     }
//
//     openEditor() {
//         this.toggleEditor();
//     }
//
//     render() {
//         return (
//             <div id="bio-editor">
//                 {!this.state.bioEditorIsVisible && this.state.bio &&
//                     <div>
//                         <p>{this.state.bio}</p>
//                         <button onClick={this.openEditor}>edit bio</button>
//                     </div>
//                 }
//
//                 {!this.state.bioEditorIsVisible && !this.state.bio &&
//                     <div>
//                         <button onClick={this.openEditor}>add bio</button>
//                     </div>
//                 }
//
//                 {this.state.bioEditorIsVisible &&
//                     <div>
//                         <textarea
//                             value={this.state.bio}
//                             onChange={this.updateBio}
//                             placeholder="please enter your bio here"
//                             rows="5" cols="30"
//                         ></textarea>
//                         <button onClick={this.uploadBio}>save bio</button>
//                     </div>
//                 }
//             </div>
//         );
//     }
//
// }
