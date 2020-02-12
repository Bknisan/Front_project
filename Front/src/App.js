import React from 'react';
import MapContainer from "./Map_ChoosePlaces";
import Register from "./Register"
import Login from "./login";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/map">
                        <MapContainer/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
};