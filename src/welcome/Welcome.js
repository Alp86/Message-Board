import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import Reset from "./Reset";
import { HashRouter, Route } from "react-router-dom";




export default function Welcome() {
    return (
        <HashRouter>
            <img
                className="splash"
                src="./background.jpg"
            />
            <div className="welcome">
                <h1>HANG IN THERE</h1>
                <h1>A BOULDERING COMMUNITY PLATFORM</h1>
                <div>
                    <Route exact component={Registration} path="/" />
                    <Route exact component={Login} path="/login" />
                    <Route exact component={Reset} path="/reset" />

                </div>

            </div>
        </HashRouter>
    );
}
