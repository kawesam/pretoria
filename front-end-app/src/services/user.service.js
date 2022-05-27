//define accessing data
import axios from "axios";
import authHeader from "./auth-header";
const API_URL = 'http://localhost:8080/api/app/';

class UserService{
    getApps (){
        return axios.get(API_URL + 'list');
    }
    getAppById(id){
        return axios.get(API_URL+ `fetch/${id}`);
    }
    updateApp(id,data){
        return axios.put(API_URL+ `update/${id}`,data,{headers:authHeader()});
    }
    addNewApp(data){
        return axios.post(API_URL+ `create`,data,{headers:authHeader()});
    }
    deleteApp(data){
        return axios.post(API_URL+ `delete`,data,{headers:authHeader(),'Content-Type' : 'application/json;charset=UTF-8'});
    }

}

export default new UserService();
