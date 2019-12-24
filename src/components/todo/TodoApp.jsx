import React,{Component} from "react"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import ForgotPasswordComponent from './ForgotPasswordComponent.jsx'

class TodoApp extends Component {
    render (){
        return(
            <div className="TodoApp">
                <Router>
                    <>
                    <HeaderComponent/>
                    <Switch>
                    <Route path="/" exact component={LoginComponent}></Route>
                    <Route path="/login" component={LoginComponent}></Route>
                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}></AuthenticatedRoute>
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}></AuthenticatedRoute>
                    <AuthenticatedRoute path="/todos" component={ListTodosComponent}></AuthenticatedRoute>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}></AuthenticatedRoute>
                    <Route path="/forgotPassword" component={ForgotPasswordComponent}></Route>
                    
                    <Route component={LoginComponent}></Route>
                    </Switch>
                    <FooterComponent/>
                    </>
                </Router>
                {/* <WelcomeComponent/> */}
               {/* <LoginComponent/> */}
               
            </div>
        )
    }
}
export default TodoApp