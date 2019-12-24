import axios from 'axios'
import {API_URL} from '../../Constants'

class TodoDataService {
    retrieveAllTodos(username){
        console.log("executed service 3");
        return axios.get(`${API_URL}/users/${username}/todos`);
    }
    retrieveTodo(username,id){
        console.log("executed service 4");
        return axios.get(`${API_URL}/users/${username}/todos/${id}`);
    }
    deleteTodo(username,id){
        console.log("executed service 5");
        return axios.delete(`${API_URL}/users/${username}/todos/${id}`);
    }
    updateTodo(username,id,todo){
        console.log("executed service 6");
        return axios.put(`${API_URL}/users/${username}/todos/${id}`,todo);
    }
    createTodo(username,todo){
        console.log("executed service 7");
        return axios.post(`${API_URL}/users/${username}/todos/`,todo);
    }
    login(username,password){
        console.log("executed service 8");
        return axios.get(`http://localhost:8081/users/${username}/${password}/`);
    }
}

export default new TodoDataService()