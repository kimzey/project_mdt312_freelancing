const loginDB = require("../models/login")
const userDB = require("../models/user")

const jwt =require("jsonwebtoken")
const { expressjwt } = require("express-jwt");

exports.login=(req,res)=>{
    const {username,password,remember} = req.body
    console.table({username,password,remember});

    userDB.findOne({username})
    .then((result)=>{
        // console.log(result["password"]);
        if(password === result["password"] && username === result["username"]){
            const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
            console.log(token);
            console.log(username);
            console.log(remember);
            return res.json({token,username,remember})
         }
         else{
             return res.status(400).json({
                 error:"password ไม่ถูกต้อง"
             })
         }
    })
    .catch(err=> res.status(400).json({
        error:"กรอก username หรือ password ไม่ถูกต้อง"
    }))

}

exports.requireLogin=expressjwt({
    secret:"projectwebmdt-secret@1234",
    algorithms:["HS256"],
    userPreperty:"auth"
})

exports.create=(req,res)=>{
    // console.log(req.body);
    const {token,username} = req.body

    loginDB.create({token,username})
    .then((result) => {
        // console.log(result);
        res.json(result)
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({error:"login ซ้ำซ้อน"})
    });
}

exports.getall = (req,res)=>{
    loginDB.find({})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอ log"})
    })
}

exports.get_token = (req,res)=>{
    const {token} = req.params

    loginDB.findOne({token})
    .then((result)=>{
        // console.log(blog);
        res.json(result)
    })
}

exports.get_username = (req,res)=>{
    const {username} = req.params

    loginDB.findOne({username})
    .then((result)=>{
        // console.log(blog);
        res.json(result)
    })
}

exports.logout = (req,res)=>{
    const {username} = req.params
    console.log(username);
    loginDB.findOneAndDelete({username})
    .then((result)=>{
        if(!result){
            res.json({message:"ไม่เจอ user"})      
        }else{
            res.json({message:"ลบ user เรียบร้อย"})      
        }
    })
    .catch((err)=>{
        if(!result){
            res.json({message:"ไม่เจอ user"})}
        res.json(err)
    })
}