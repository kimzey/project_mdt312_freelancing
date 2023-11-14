const userDB = require("../models/user")

exports.create=(req,res)=>{
    console.log(req.body);
    const {name,email,tel,username,password,details,birhday,is_admin} = req.body

    switch(true){
        case !name:
            return res.status(400).json({error:"กรุณาป้อนชื่อ"})
            break
        case !email:
            return res.status(400).json({error:"กรุณาป้อนอีเมลล์"})
            break
        case !tel:
            return res.status(400).json({error:"กรุณาป้อนเบอร์โทร"})
            break
        case !username:
            return res.status(400).json({error:"กรุณาป้อน username"})
            break
        case !password:
            return res.status(400).json({error:"กรุณาป้อน password"})
            break
    }

    userDB.create({name,email,tel,username,password,details,birhday,is_admin})
    .then((result) => {
        // console.log(result);
        res.json(result)
    })
    .catch((err) => {
        const error = Object.keys(err["keyPattern"]).pop()
        // console.log(error);
        switch(true){
            case !email:
                return res.status(400).json({error:"Email ซ้ำโปรดกรอกอีกครั้ง"})
                break
            case !tel:
                return res.status(400).json({error:"tel ซ้ำโปรดกรอกอีกครั้ง"})
                break
            case !username:
                return res.status(400).json({error:"username ซ้ำโปรดกรอกอีกครั้ง"})
                break
        }
        res.json(err)
    });
}

exports.getAlluser = (req,res) =>{
    userDB.find({})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอผู้ใช้"})
    })
}

exports.getuser = (req,res)=>{
    const {username} = req.params
    userDB.findOne({username})
    .then((result)=>{
        // console.log(blog);
        res.json(result)
    })
}

exports.remove = (req,res)=>{
    const {username} = req.params
    console.log(username);
    userDB.findOneAndDelete({username})
    .then((result)=>{
        console.log(result);
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

exports.update = (req,res)=>{
    const {username} = req.params

    const {name,email,tel,password,details,birhday,is_admin} = req.body
    // console.table({name,email,tel,username,password,details,birhday,is_admin});
    userDB.findOneAndUpdate({username},{name,email,tel,password,details,birhday,is_admin},{new:true})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        // console.log(err);
        res.status(400).json({error:"แก้ไขไม่สำเร็จ"})
    })
}