import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions";

import axios from "../axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Header from "./Header";

import Profile from "./Profile";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import Uploader from "./Uploader";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Chat from "./Chat";
import UsersOnline from "./UsersOnline";

export default function App () {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const user = useSelector(
        state => state && state.user
    )


    return (
        <>
        <BrowserRouter>
        {user &&
            <div>
                <Header/>

                <Route
                    exact path="/"
                    component={Profile}
                />

                <Route
                     path="/user/:id"
                     render={props => (
                         <OtherProfile
                             key={props.match.url}
                             match={props.match}
                             history={props.history}
                         />
                     )}
                />

                <Route
                    path="/findpeople"
                    render={props => (
                        <FindPeople
                            history={props.history}
                        />
                    )}
                />

                <Route
                    path="/friends"
                    render={props => (
                        <Friends
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/chat"
                    component={Chat}
                />
                <Route
                    path="/users-online"
                    render={props => (
                        <UsersOnline
                            history={props.history}
                        />
                    )}
                />
            </div>
            }
        </BrowserRouter>
        </>
    );

}

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//
//     componentDidMount() {
//         console.log("App is running");
//         axios.get("/user")
//             .then( ({data}) => {
//                 console.log("get /user response:", data);
//                 this.setState({ ...data}, () => console.log("this.state:", this.state));
//             })
//             .catch(error => console.log("error in GET /user:", error));
//     }
//
//     render() {
//         if (!this.state.id) {
//             return <img id="loading-icon" src="/loading.gif" alt="Loading..." />;
//         }
//         return (
//             <>
//             <BrowserRouter>
//                 <div>
//                     <Header data={this.state}/>
//                     <Route
//                         exact path="/"
//                         render={() => (
//                             <Profile
//                                 first={this.state.first}
//                                 last={this.state.last}
//
//                                 profilePic={
//                                     <ProfilePic
//                                         first={this.state.first}
//                                         last={this.state.last}
//                                         url={this.state.url}
//                                         clickHandler={() => this.setState({
//                                             uploaderVisible: true
//                                         }, () => console.log("openUploader has been clicked"))}
//                                     />
//                                 }
//
//                                 bioEditor={
//                                     <BioEditor
//                                         bio={this.state.bio}
//                                         setBio={newBio => this.setState({
//                                             bio: newBio
//                                         })}
//                                     />
//                                 }
//                             />
//
//                         )}
//                     />
//                     {this.state.uploaderVisible &&
//                         <Uploader
//                             id={this.state.id}
//                             setImage={newUrl => this.setState({
//                                 url: newUrl
//                             })}
//                             closeUploader={event => this.setState({
//                                 uploaderVisible: false
//                             })}
//                         />
//                     }
//
//                     <Route
//                          path="/user/:id"
//                          render={props => (
//                              <OtherProfile
//                                  key={props.match.url}
//                                  match={props.match}
//                                  history={props.history}
//                              />
//                          )}
//                     />
//
//                     <Route
//                         path="/findpeople"
//                         render={props => (
//                             <FindPeople
//                                 history={props.history}
//                             />
//                         )}
//                     />
//
//                     <Route
//                         path="/friends"
//                         render={props => (
//                             <Friends
//                                 history={props.history}
//                                 userId={this.state.id}
//                             />
//                         )}
//                     />
//                     <Route
//                         path="/chat"
//                         component={Chat}
//                     />
//                     <Route
//                         path="/users-online"
//                         render={props => (
//                             <UsersOnline
//                                 history={props.history}
//                             />
//                         )}
//                     />
//                 </div>
//             </BrowserRouter>
//             </>
//         );
//     }
// }
