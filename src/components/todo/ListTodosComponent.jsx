import React, { Component } from "react"
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'



class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message: null,
            todos1: []
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.fetchIndexDBList = this.fetchIndexDBList.bind(this);
        this.change = this.change.bind(this);

    }
    change(obj) {
        this.setState({ obj });
    }

    componentDidMount() {

        this.fetchIndexDBList();
        // if (AuthenticationService.checkInternet()) {
        //     this.refreshTodos();
        // } else {
        //     alert("You are offline");
        // }
        
    }
    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    // console.log(response)
                    this.setState({ todos: response.data })
                }
            );
    }
    updateTodoClicked(id) {
        console.log("inside todo clicked");
        // let username = AuthenticationService.getLoggedInUserName();
        this.props.history.push(`/todos/${id}`)
        // TodoDataService.deleteTodo(username,id)
        // .then(
        //     response => {
        //    this.setState({message : `Delete of todo ${id} successful`});
        //    this.refreshTodos()
        //     }
        // );
    }
    fetchIndexDBList() {
        if (!('indexedDB' in window)) {
            alert('This browser does not support IndexedDB');
        } else {
            var db;
            var myResult = [];
            var request = indexedDB.open("todo-app", 5);
            request.onerror = function (event) {
                console.error("Database error: " + event.target.errorCode);
                console.log("Why didn't you allow my web app to use IndexedDB?!");
            }.bind(this);

            var arr = [];
            // console.log("---1---");
            request.onsuccess = function (event) {
                // console.log("---2---");
                db = event.target.result;
                var customerObjectStore = db.transaction("todo").objectStore("todo");
                // console.log("---3---");
                var getRequest = customerObjectStore.getAll();
                // console.log("---4---");
                getRequest.onsuccess = function (event) {
                    // console.log("---5---");
                    myResult = getRequest.result;
                    // console.log("1st result---"+myResult)
                    // this.change({ todos1: myResult })   
                    this.setState({ todos1: myResult });
                    // document.getElementById('todoList').innerHTML = "";

                }.bind(this);
                getRequest.onerror = function (event) {
                    console.error("Database error: " + event.target.errorCode);
                    console.log("Why didn't you allow my web app to use IndexedDB?!");
                }.bind(this);
                // console.log("---5---");
            }.bind(this);
            // console.log("2nd result---"+myResult);
            // this.setState({todos1:myResult});
            // console.log("last result---"+myResult)
        }
    }

    deleteTodoClicked(id) {
        console.log("delete todo clicked---" + id);
        if(window.confirm("Are you sure you want to delete?")){
        // Start index db code
        if (!('indexedDB' in window)) {
            alert('This browser does not support IndexedDB');
        } else {

            var db;
            var request = indexedDB.open("todo-app", 5);

            request.onerror = function (event) {
                console.error("Database error: " + event.target.errorCode);
                console.log("Why didn't you allow my web app to use IndexedDB?!");
            }.bind(this);

            request.onsuccess = function (event) {
                db = event.target.result;
                // var transaction = db.transaction(["todo"]);
                var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo")
                    .delete(id);
                customerObjectStore.onsuccess = function (event) {
                    var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo");
                    var getRequest = customerObjectStore.getAll();
                    // console.log("---4---");
                    getRequest.onsuccess = function (event) {
                        // console.log("---5---");
                        // myResult = getRequest.result;
                        // console.log("1st result---"+myResult)
                        // this.change({ todos1: myResult })   
                        this.setState({ todos1: getRequest.result });
                        // document.getElementById('todoList').innerHTML = "";

                    }.bind(this);
                }.bind(this);

            }.bind(this);
            // This event is only implemented in recent browsers   

            request.onupgradeneeded = function (event) {
                // Save the IDBDatabase interface 
                var db = event.target.result;

                // Create an objectStore for this database
                var objectStore = db.createObjectStore("todo", { keyPath: 'USER_ID', autoIncrement: true });
                objectStore.transaction.oncomplete = function (event) {
                    // var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo");

                    // Store values in the newly created objectStore.

                };
            };


        }
        // End index db code



        let username = AuthenticationService.getLoggedInUserName();
        // if (AuthenticationService.checkInternet()) {
        //     TodoDataService.deleteTodo(username, id)
        //         .then(
        //             response => {
        //                 this.setState({ message: `Delete of todo ${id} successful` });
        //                 this.refreshTodos()
        //             }
        //         );
        // } else {
        //     alert("You are offline");
        // }
    }
    }

    addTodoClicked(id) {
        this.props.history.push(`/todos/-1`)
    }



    render() {
        return (
            <div>
                <h1>List todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}

                <div className="container">
                    {/* <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Done</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{todo.isDone.toString()}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table> */}
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add Todo</button>
                    </div>
                </div>

                <div className="container">
                    {/* Indexed DB List: */}
<table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                {/* <th>Done</th> */}
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id="todoList">
                            {
                                this.state.todos1.map(
                                    todo =>
                                        <tr key={todo.USER_ID}>
                                            <td>{todo.USER_ID}</td>
                                            <td>{todo.description}</td>
                                            {/* <td>Not done</td> */}
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.USER_ID)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.USER_ID)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListTodosComponent