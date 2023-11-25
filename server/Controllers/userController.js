const userDB = require("../models/user")
const multer = require('multer');
const {storage_img,imageFilterIMG} = require("../services/upload_img")
const {storage_pdf,imageFilterPDF} = require("../services/upload_pdf")

exports.create=(req,res)=>{
    console.log(req.body);
    const {name,email,tel,username,password,details,birhday,is_admin} = req.body
    console.table({name,email,tel,username,password,details,birhday,is_admin});

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

        if(err["keyPattern"] === undefined){
            res.status(400).json(err)
        }

        console.log(err["keyPattern"]);
        const error = Object.keys(err["keyPattern"]).pop()
        console.log(error);

        switch(true){
            case error == "email":
                return res.status(400).json({error:"Email ซ้ำโปรดกรอกอีกครั้ง"})
                break
            case error ==  "tel":
                return res.status(400).json({error:"เบอร์โทร ซ้ำโปรดกรอกอีกครั้ง"})
                break
            case error ==  "username":
                return res.status(400).json({error:"username ซ้ำโปรดกรอกอีกครั้ง"})
                break
        }
        res.status(400).json(err)
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
    const {name,password,ability,education,experience,link_html} = req.body
    // console.table({name,email,tel,username,password,details,birhday,is_admin});
    console.log(password);
    
    switch(true){
        case !password:
            return res.status(400).json({error:"กรุณาป้อน password"})
            break
    }

    userDB.findOneAndUpdate({username},{name,password,ability,education,experience,link_html},{new:true})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({error:"แก้ไขไม่สำเร็จ"})
    })
}

exports.searchUser = (req,res)=>{
    const {input} =req.body
    console.log(input);
    userDB.find({"username": {$regex: '^' + input, $options: 'i'}})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })
} 

exports.updateIMG = (req,res) =>{
    console.log(req.body);
    let upload = multer({ storage: storage_img, fileFilter: imageFilterIMG }).single('profile_img');

    const {username} = req.params
    console.log(username);

    upload(req, res, async (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        console.log('You uploaded this image filename: '+ req.file.filename);

        userDB.findOneAndUpdate({username},{"name_img":req.file.filename},{new:true})
        .then((result)=>{
            console.log(result);
            res.json(result)
        })
        .catch((err)=>{
            // console.log(err);
            res.status(400).json(err)
        })

    });
}

exports.updatePDF = (req,res) =>{
    let upload = multer({ storage: storage_pdf, fileFilter: imageFilterPDF }).single('name_pdf');

    const {username} = req.params
    console.log(username);

    upload(req, res, async (err) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an pdf to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        console.log('You uploaded this pdf filename: '+ req.file.filename);
        
        userDB.findOneAndUpdate({username},{"name_pdf":req.file.filename},{new:true})
        .then((result)=>{
            console.log(result);
            res.json(result)
        })
        .catch((err)=>{
            // console.log(err);
            res.status(400).json(err)
        })

    });
}