const loginDB = require("../models/login")


exports.create=(req,res)=>{
    console.log(req.body);
    const {token,username} = req.body

    loginDB.create({token,username})
    .then((result) => {
        // console.log(result);
        res.json(result)
    })
    .catch((err) => {
        // console.log(error);
        res.json(err)
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