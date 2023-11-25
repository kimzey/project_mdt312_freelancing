const favouriteDB = require("../models/favourite")
const {v4:uuidv4} = require('uuid')

exports.create_favourite=(req,res)=>{
    // console.log(req.body);
    const {id_post,username} = req.body

    console.log(id_post);
    console.log(username);

    favouriteDB.findOne({ $and: [{ id_post }, { username }] })
    .then(result=>{
        console.log(result);
        if(result){
            res.status(400).json({error:"กดไลค์ไปแล้ว"})
        }else{
            favouriteDB.create({id_post,username})
            .then((result) => {
                console.log(result);
                res.json(result)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({error:"กดไลค์ผิดพลาด"})
            });
        }
    })
    .catch(err=>{
        res.status(400).json(err)
    })
}

exports.get_favourite = (req,res)=>{

    const {username} = req.params
    console.log(username);
    favouriteDB.find({username}).sort({createdAt:-1})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอการชื่อชอบ"})
    })
}

exports.get_favouriteall = (req,res)=>{
    favouriteDB.find({}).sort({createdAt:-1})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอการชื่อชอบ"})
    })
}

exports.remove_save = (req,res)=>{

    const {_id} = req.params
    console.log(_id);

    favouriteDB.findOneAndDelete({_id})
    .then((result)=>{
        console.log(result);
        res.json(result)      
    })
    .catch((err)=>{
            res.json({message:"ไม่เจอบทความ"})
    })
}

