import axios from "axios"
import Swal from "sweetalert2"

export const authenticate = (res,next)=>{
    if(window !== "undefined"){
        const {token,username,remember} = res.data
        console.table({token,username,remember});
        axios.post(`http://localhost:5050/api/login/create`,{token,username})
        .then(result=>{
            console.log(result);
            localStorage.setItem("token",JSON.stringify(token))
            localStorage.setItem("user",JSON.stringify(username))
            localStorage.setItem("remember",JSON.stringify(remember))
            next()
        })
        .catch(err=>{
            console.log(err);
            Swal.fire({
                title: "แจ้งเตือน",
                text: err.response.data.error,
                icon: "error"
              })
            })
    }
}

export const getToken=()=>{
    if(window !== "undefined"){
        if(localStorage.getItem("token")){
            return JSON.parse(localStorage.getItem("token"))
        }
        else{
            return false;
        }
    }
}

export const getUser=()=>{
    if(window !== "undefined"){
        if(localStorage.getItem("user")){
            return JSON.parse(localStorage.getItem("user"))
        }
        else{
            return false;
        }
    }
}

export const getRemember=()=>{
    if(window !== "undefined"){
        if(localStorage.getItem("user")){
            return JSON.parse(localStorage.getItem("remember"))
        }
        else{
            return false;
        }
    }
}

export const logout=(user)=>{
    console.log(user);
    if(window !== "undefined"){
        axios.post(`http://localhost:5050/api/logout/${user}`)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("remember")
        // window.location = "/login"
    }
}