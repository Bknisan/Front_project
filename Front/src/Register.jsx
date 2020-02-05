import React, {Component} from "react";
import './css/Register.css';

export default class Register extends Component {

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
        if (this.state['pass'] !== this.state['passConf']) {
            alert("Password don't match!");

        } else {

        }
        // TODO : Send this.state to server and do something
    }


    render() {
        return <div id={'form'}>
            <form onSubmit={this.handleSubmit} >
                <h1>Register</h1>
                <hr/>
                <br/>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="fname" placeholder="First Name"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lname" placeholder="Last Name"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="pass" placeholder="Password"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="passConf" placeholder="Confirm Password"
                           onChange={this.handleInputChange} id="input" required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-success" id="button">Submit</button>
            </form>
        </div>
    }
}