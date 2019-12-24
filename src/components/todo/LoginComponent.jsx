import React,{Component} from "react"
import AuthenticationService from './AuthenticationService.js'
// import TodoDataService from '../../api/todo/TodoDataService.js'
// import DB from './db.js'

class LoginComponent extends Component {
  // let db;
    constructor(props){
        super(props)
        this.state={
            username : 'anchal',
            password : '',
            hasLoginFailed : false,
            showSuccessMessage : false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.forgotPasswordClicked = this.forgotPasswordClicked.bind(this)
        // this.addRecipe =this.addRecipe.bind(this)
    }
    handleChange(event){
        console.log(event.target.value);
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    forgotPasswordClicked() {
        let condition = AuthenticationService.checkInternet();
        if (condition) {
            console.log("online---");
            this.props.history.push('/forgotPassword')
        } else {
            alert("You are offline.");
        }
    }
    // handleUsernameChange(event){
    // console.log(event.target.value);
    // this.setState({
    //     username:event.target.value
    // })
    // }
    // handlePasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState({
    //         password:event.target.value
    //     })
    //     }
    loginClicked(){
        var db;
        // function dbIntialition() {
if (!('indexedDB' in window)) {
    // console.log('This browser does not support IndexedDB');
  } else {
    // console.log('In function');
    // var openRequest = indexedDB.open('test_db', 1);
    // // console.log("OpenRequset", openRequest);
    // openRequest.onupgradeneeded = function (e) {
    //   // console.log('In Open Request');
    //   var db = e.target.result;
    //   // console.log('running onupgradeneeded');
    //   if (!db.objectStoreNames.contains('user')) {
    //     var storeOS = db.createObjectStore('user', { keyPath: 'id', autoIncrement: true });
    //     storeOS.createIndex("username", "username", { unique: true });
    //   }
    // };
    // openRequest.onsuccess = function (e) {
    //   console.log('inside open request');
    //   db = e.target.result;
    //   console.log("Db in success", db);
    //   var transaction = db.transaction(['user'], 'readwrite');
    //   var recipe = transaction.objectStore('user');
    //   var item = {
    //     username: document.getElementById("username").value,
    //     password : document.getElementById("password").value,
    //     // username : username,
    //     // password : password,
    //     created: new Date().getTime()
    //   };
    //   console.log(item);
    //   var request = recipe.add(item);
    
    //   request.onerror = function (e) {
    //     console.log("In error");
    //     alert("Duplicate username");
    //     // console.log('Error', e.target.error.name);
    //   };
    //   request.onsuccess = function (e) {
        
    //   //   getListOfRecipe();
    //   //   document.getElementById("name").value = "";
    //   //   document.getElementById("emailId").value = "";
    //     // document.getElementById("task").value = "";
    //     // location.reload();
    //     // console.log('Woot! Did it');
    //   };
    // };
    // openRequest.onerror = function (e) {
  
    //   console.log('onerror!');
    //   // console.dir(e);
    // };
    // console.log("After open request")
  }
  if(this.state.username != null && this.state.username != '' && this.state.password != null && this.state.password != ''){
    AuthenticationService.registerSuccessfullLogin(this.state.username,this.state.password);
    this.props.history.push(`/welcome/${this.state.username}`)
  }else{
      alert("Please enter username & password")
  }
  

// AuthenticationService.executeJwtAuthenticationService(this.state.username,this.state.password)
// .then(
// () => {
//     AuthenticationService.registerSuccessfullLogin(this.state.username,this.state.password);
//     this.props.history.push(`/welcome/${this.state.username}`)
// }
// ).catch(
// () => {
//     this.setState({showSuccessMessage:false})
//     this.setState({hasLoginFailed:true}) 
// }
// )
    }
    
render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
                {/* {this.state.showSuccessMessage && <div>Login successful</div>} */}
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {this.state.hasLoginFailed && <div className="alert alert-warning">Login failed</div>}
                <br/>Username : <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/><br/><br/>
                Password : <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} /><br/><br/>
                <button className="btn btn-success myBtn" onClick={this.loginClicked}>Login</button><br/>
                <br/><br/><button className="btn btn-success myBtn" onClick={this.forgotPasswordClicked}>Forgot Password</button>
                </div>
            </div>
        )
    }
}
// function addRecipe() {
//   // var db = dbIntialition();
//   addItem();
// }

// function addItem() {
//   // var db = dbIntialition();
//   var transaction = db.transaction(['user'], 'readwrite');
//   var recipe = transaction.objectStore('user');
//   var item = {
//   //   name: document.getElementById("name").value,
//   //   emailId: document.getElementById("emailId").value,
//     name: "Anchal",
//     emailId: "anchal.c@altius.cc",
//     task: "",
//     created: new Date().getTime()
//   };
//   console.log(item);
//   var request = recipe.add(item);

//   request.onerror = function (e) {
//     console.log("In error");
//     alert("Duplicate email Id");
//     // console.log('Error', e.target.error.name);
//   };
//   request.onsuccess = function (e) {
//   //   getListOfRecipe();
//   //   document.getElementById("name").value = "";
//   //   document.getElementById("emailId").value = "";
//     // document.getElementById("task").value = "";
//     // location.reload();
//     // console.log('Woot! Did it');
//   };
// }
// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         console.log("login failed");
//         return <div>Login failed</div>
//     }
//     return null;
// }

// function ShowLoginSuccessMessage(props){
//     if(props.showSuccessMessage){
//         console.log("login success");
//         return <div>Login successful</div>
//     }
//     return null;
// }
export default LoginComponent