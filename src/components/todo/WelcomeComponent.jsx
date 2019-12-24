import React, { Component } from "react"
import { Link } from "react-router-dom"
import HelloWorldService from '../../api/todo/HelloWorldService.js'
import AuthenticationService from "./AuthenticationService.js"

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.You can manage your todos <Link to="/todos">here</Link>
                </div>
                {/* <div className="container">
                    Click here to get customized welcome message <br />
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Connect to server</button>
                </div> */}
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
    retrieveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccessfulResponse(response))
        // .catch()

        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))
        // .catch()
        // if (AuthenticationService.checkInternet()) {
        //     HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        //         .then(response => this.handleSuccessfulResponse(response))
        //         .catch(error => this.handleError(error));
        // } else {
        //     alert("You are offline");
        // }
    }
    handleSuccessfulResponse(response) {
        this.setState({ welcomeMessage: response.data.message })
    }
    handleError(error) {
        console.log("----------->" + error.response);
        let errorMessage = '';
        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }


        this.setState({ welcomeMessage: errorMessage })
    }
}
export default WelcomeComponent