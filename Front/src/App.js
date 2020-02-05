import React, {Component} from 'react';
import MapContainer from "./Map";
import {PlaceDetails} from "./PlaceDetails";
import Register from "./Register"
import Login from "./login";
class App extends Component {

    render() {
        return (
            <div className="App">
                <Register/>
            </div>
        );
    }
}

export default App;
