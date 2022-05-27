import axios from "axios";
const API_URL = "http://localhost:8080/api/";
class AuthService {
    login(username,password){
        return axios
            .post(API_URL + "auth/signin",{
                username,
                password
            })
            .then(response =>{
                console.log("Here " + response.data.accessToken);
                if(response.data.accessToken){
                    localStorage.setItem('user',JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout(){
        localStorage.removeItem("user");
    }
    register(username,password){
        return axios.post(API_URL + "auth/signup",{
            username,
            password
        });
    }
    getCurrentUser(){
        return JSON.parse((localStorage.getItem('user')));
    }
}

export  default new AuthService();
