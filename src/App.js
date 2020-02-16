import React from 'react';
import Register from "./Register"
import Login from "./login";
import Map_ChoosePlaces from "./Map_ChoosePlaces";
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
                    <Route path="/choosePlace">
                        <Map_ChoosePlaces/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
};