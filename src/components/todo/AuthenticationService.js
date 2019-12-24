import axios from 'axios'
import {API_URL} from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticateUser'
export const PASSWORD_SESSION_ATTRIBUTE_NAME = 'authenticatePassword'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            {
                headers: {
                    authorization: this.createBasicAuthToken(username, password)
                }
            }
        );
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`,
            {
                username, password
            }
        );
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    registerSuccessfullLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(PASSWORD_SESSION_ATTRIBUTE_NAME, password);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(PASSWORD_SESSION_ATTRIBUTE_NAME);
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user == null) return false;
        return true;
    }
    getLoggedInUserName() {
        let username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (username == null) return '';
        return username;;
    }

    // setupAxiosInterceptors(basicAuthHeader) {
    //     axios.interceptors.request.use(
    //         (config) => {
    //             if (this.isUserLoggedIn()) {
    //                 config.headers.authorization = basicAuthHeader
    //             }
    //             return config
    //         }
    //     )
    // }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
    checkInternet() {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online')
            return true;
        return false;
    }

    // CreateObjectStore(storeName) {
    //     var request = indexedDB.open('');
    //     request.onsuccess = function (e){
    //         var database = e.target.result;
    //         var version =  parseInt(database.version);
    //         database.close();
    //         var secondRequest = indexedDB.open(dbName, version+1);
    //         secondRequest.onupgradeneeded = function (e) {
    //             var database = e.target.result;
    //             var objectStore = database.createObjectStore(storeName, {
    //                 keyPath: 'id'
    //             });
    //         };
    //         secondRequest.onsuccess = function (e) {
    //             e.target.result.close();
    //         }
    //     }
    // }
    

}

export default new AuthenticationService()