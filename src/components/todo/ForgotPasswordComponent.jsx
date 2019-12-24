import React, { Component } from "react"
import AuthenticationService from './AuthenticationService.js'

class ForgotPasswordComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailId: ''
        }
        this.submitClicked = this.submitClicked.bind(this)
        this.cancelClicked = this.cancelClicked.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    submitClicked() {
        let condition = AuthenticationService.checkInternet();
        if (condition) {
            if(this.state.emailId != null && this.state.emailId != ''){
            sessionStorage.setItem('authenticateEmailId', this.state.emailId);
            alert("Password changed successfully!!!");
            this.props.history.push('/login')
        }else{
            alert("Please enter email id");
        }
            // alert("Going to change the password");
        } else {
            alert("You need to be online to change the password.");
        }
    }
    cancelClicked() {
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="forgotPassword">
                <br />Email Id <br /><input type="email" name="emailId" id="emailId" value={this.state.emailId} onChange={this.handleChange}/><br /><br />
                <button className="btn btn-success myBtn" onClick={this.submitClicked}>Submit</button><br /><br />
                <button className="btn btn-success myBtn" onClick={this.cancelClicked}>Cancel</button>
            </div>
        )
    }
}
export default ForgotPasswordComponent