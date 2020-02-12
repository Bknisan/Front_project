import React from 'react';
import './css/login.css';
import {Redirect} from "react-router-dom";

export default class Login extends React.Component {
    state = {go_to_register: false};

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // TODO : Check input with DB and redirect to other pages
        fetch('http://localhost:9009/login/' + this.state.email + '/' + this.state.password)
            .then(function (response) {
                console.log(response.json());
            })
    }


    render() {
        if (this.state.go_to_register) {
            return <Redirect to="/register" push={true}/>
        } else return <div id={'form'}>
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <hr/>
                <br/>
                <br/>
                <div className="form-group">
                    <input type="text" className="form-control" name="email" placeholder="Email"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="password" placeholder="Password"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <br/>
                <br/>
                <button type="submit" className="btn btn-success" id="button">Submit</button>
                <br/>
                <br/>
                <a href="#" id="pass-forgot">forgot password?</a>
                <br/>
                <hr/>
                <button onClick={() => this.setState({go_to_register : true})}
                        type="button"
                        className="btn btn-primary"
                        id="button"
                >Register
                </button>
            </form>
        </div>

    };
}