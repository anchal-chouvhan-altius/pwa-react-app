import axios from 'axios'

class HelloWorldService {
executeHelloWorldService(){
    console.log("executed service 1");
    return axios.get('http://localhost:8081/hello-world');
}
executeHelloWorldBeanService(){
    console.log("executed service 2");
    return axios.get('http://localhost:8081/hello-world-bean');
}
executeHelloWorldPathVariableService(name){
    
    console.log("executed service 3");
    return axios.get(`http://localhost:8081/hello-world/path-variable/${name}`);
}
}

export default new HelloWorldService()