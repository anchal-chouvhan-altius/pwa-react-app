import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            USER_ID: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.goBack = this.goBack.bind(this)
        this.getIndexedDBDataById = this.getIndexedDBDataById.bind(this)
    }
    goBack() {
        this.props.history.push('/todos')
    }
    onSubmit(values) {
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        console.log(values);
        let username = AuthenticationService.getLoggedInUserName();
        console.log("on submit called");
        console.log("id---*******" + this.state.id)

        if (this.state.id === "-1") {
            console.log("outside if");
            if (!('indexedDB' in window)) {
                alert('This browser does not support IndexedDB');
            } else {

                var db;
                var request = indexedDB.open("todo-app", 5);
                request.onerror = function (event) {
                    console.error("Database error: " + event.target.errorCode);
                    console.log("Why didn't you allow my web app to use IndexedDB?!");
                };
                const customerData = [
                    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
                    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
                ];

                //   var item = {
                //     username: document.getElementById("username").value,
                //     password : document.getElementById("password").value,
                //     // username : username,
                //     // password : password,
                //     created: new Date().getTime()
                //   };

                request.onsuccess = function (event) {
                    db = event.target.result;
                    var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo");
                    // customerData.forEach(function(customer) {
                    customerObjectStore.add(todo);
                    // });
                };
                //   transaction.oncomplete = function(event) {
                //     console.log("All done!");
                //   };

                // This event is only implemented in recent browsers   

                request.onupgradeneeded = function (event) {
                    // Save the IDBDatabase interface 
                    var db = event.target.result;

                    // Create an objectStore for this database
                    var objectStore = db.createObjectStore("todo", { keyPath: 'USER_ID', autoIncrement: true });
                    objectStore.createIndex("USER_ID", "USER_ID", { unique: true });
                    // objectStore.createIndex("id", "id", { unique: true });
                    objectStore.transaction.oncomplete = function (event) {
                        var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo");
                        // customerData.forEach(function(customer) {
                        customerObjectStore.add(todo);
                        // });
                        // Store values in the newly created objectStore.

                    };
                };


            }

            this.props.history.push('/todos');
            console.log("call api");
            // if (AuthenticationService.checkInternet()) {
            //     TodoDataService.createTodo(username, todo).then(
            //         () => this.props.history.push('/todos')
            //     )
            // } else {
            //     alert("You are offline. You can not add new todo");
            // }
        } else {
            console.log("inside else update");
            if (!('indexedDB' in window)) {
                alert('This browser does not support IndexedDB');
            } else {
                var db;
                var request = indexedDB.open("todo-app", 5);
                request.onerror = function (event) {
                    console.error("Database error: " + event.target.errorCode);
                    console.log("Why didn't you allow my web app to use IndexedDB?!");
                };


                //   var item = {
                //     username: document.getElementById("username").value,
                //     password : document.getElementById("password").value,
                //     // username : username,
                //     // password : password,
                //     created: new Date().getTime()
                //   };

                request.onsuccess = function (event) {
                    db = event.target.result;
                    var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo");
                    var request = customerObjectStore.get(this.state.id);
                    console.log("id in update---" + this.state.id);


                    console.log("request user id----" + request)
                    request.onerror = function (event) {
                        console.error("Database error: " + event.target.errorCode);
                        console.log("Why didn't you allow my web app to use IndexedDB?!");
                    }.bind(this);
                    request.onsuccess = function (event) {
                        var data = event.target.result;
                        // console.log("user id 1---"+values.USER_ID);
                        // console.log("user id 2---"+this.state.id);
                        // console.log("data description---"+values.description);
                        // data.description = values.description;
                        // console.log("request id----"+request.result.description)
                        let updatedTodo = {
                            id: -1,
                            USER_ID: parseInt(values.USER_ID),
                            description: values.description,
                            targetDate: values.targetDate
                        }
                        var requestUpdate = customerObjectStore.put(updatedTodo);
                        requestUpdate.onerror = function (event) {
                            // Do something with the error
                        }.bind(this);
                        requestUpdate.onsuccess = function (event) {
                            // Success - the data is updated!
                        }.bind(this);
                    }.bind(this);
                    // });
                }.bind(this);
                //   transaction.oncomplete = function(event) {
                //     console.log("All done!");
                //   };

                // This event is only implemented in recent browsers   

                request.onupgradeneeded = function (event) {
                    // Save the IDBDatabase interface 
                    var db = event.target.result;

                    // Create an objectStore for this database
                    var objectStore = db.createObjectStore("todo", { keyPath: 'USER_ID', autoIncrement: true });
                    objectStore.transaction.oncomplete = function (event) {
                        var customerObjectStore = db.transaction("todo", "readwrite").objectStore("todo");
                        var request = customerObjectStore.get(this.state.id);
                        request.onerror = function (event) {
                            // Handle errors!
                        };
                        request.onsuccess = function (event) {
                            // customerData.forEach(function(customer) {
                            var requestUpdate = customerObjectStore.put(todo);
                            requestUpdate.onerror = function (event) {
                                // Do something with the error
                            };
                            requestUpdate.onsuccess = function (event) {
                                // Success - the data is updated!
                            };
                        }

                    };
                };


            }
            this.props.history.push('/todos')
            // if (AuthenticationService.checkInternet()) {
            //     TodoDataService.updateTodo(username, this.state.id, todo).then(
            //         () => this.props.history.push('/todos')
            //     )
            // } else {
            //     alert("You are offline");
            // }
        }
    }

    componentDidMount() {
        if (this.state.id === "-1") {
            return
        }
        this.getIndexedDBDataById();
        // let username = AuthenticationService.getLoggedInUserName();
        // TodoDataService.retrieveTodo(username, this.state.id)
        //     .then(response => this.setState({
        //         description: response.data.description,
        //         targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        //     }))
    }

    getIndexedDBDataById() {
        var db;
        var request = indexedDB.open("todo-app", 5);
        request.onerror = function (event) {
            console.error("Database error: " + event.target.errorCode);
            console.log("Why didn't you allow my web app to use IndexedDB?!");
        }.bind(this);
        request.onsuccess = function (event) {
            db = event.target.result;
            var transaction = db.transaction(['todo'], 'readwrite');
            var todo = transaction.objectStore('todo');
            // var getRequest = todo.get(this.state.USER_ID);
            var getRequest = todo.get(parseInt(this.state.USER_ID));
            getRequest.onerror = function (event) {
                console.log("Error occured while fetching data");
            }.bind(this);
            getRequest.onsuccess = function (event) {
                console.log("inside on success");
                console.log("---result---" + getRequest.result);
                this.setState({
                    description: getRequest.result.description,
                    targetDate: moment(getRequest.result.targetDate).format('YYYY-MM-DD')
                });
            }.bind(this);
        }.bind(this);
    }

    validate(values) {

        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a description'
            console.log(values)
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 character in description'
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }
        return errors;
    }

    render() {
        let { USER_ID, description, targetDate } = this.state
        return (
            <><br />
                <h4>Update Todo</h4><br />
                <div className="container">
                    <Formik
                        initialValues={{ USER_ID, description, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>

                                    <button className="btn btn-warning" type="button" onClick={this.goBack}>Back</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </>
        )
    }
}
export default TodoComponent