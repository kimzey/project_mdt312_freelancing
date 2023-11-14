const userDB = require("../models/user")

exports.create=(req,res)=>{
    console.log(req.body);
    const {name,email,tel,username,password,details,slug} = req.body

    userDB.create({name,email,tel,username,password,details,slug})
    .then((result) => {
        console.log(result);
        res.json(result)
    }).catch((err) => {
        console.log(err);
        res.json(err)
    });
}

exports.getAlluser = (req,res) =>{
    userDB.find({})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
}