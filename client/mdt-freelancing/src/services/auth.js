import axios from "axios"
export const authenticate = (res,next)=>{
    if(window !== "undefined"){
        const {token,username,remember} = res.data
        console.table({token,username,remember});
        axios.post(`http://localhost:5050/api/login/create`,{token,username})
        localStorage.setItem("token",JSON.stringify(token))
        localStorage.setItem("user",JSON.stringify(username))
        localStorage.setItem("remember",JSON.stringify(remember))
    }
    next()
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

export const logout=(next)=>{
    if(window !== "undefined"){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("remember")
    }
    next()
}