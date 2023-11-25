const postDB = require("../models/post")
const {storage_img_post,imageFilterIMG} = require("../services/upload_img")
const multer = require('multer');
const slugify = require("slugify")
const {v4:uuidv4} = require('uuid')

exports.create= async (req,res) =>{
    console.log(req.body);

    const {content,author,category} = req.body
    let slug = uuidv4();

    switch(true){
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break
        case !author:
            return res.status(400).json({error:"กรุณาป้อนชื่อผู้แต่ง"})
            break
    }

    postDB.create({content,author,category,slug})
    .then((result) => {
        console.log(result);
        res.json({result,slug})
    })
    .catch((err) => {
        console.log(err);
        res.json(err)
    });
}

exports.getAllpost = (req,res) =>{
    const {category,number} = req.params
    console.log((0+number)*10);

    postDB.find({category}).sort({createdAt:-1}).skip((0+number)*10).limit(10)
    .then(result=>{
        console.log(result);
        res.json(result)
        console.log((0+number)*10);
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอบทความ"})
    })
}

exports.getAllpostbyid = (req,res) =>{
    const {_id} = req.params
    console.log(_id);
    postDB.findOne({_id})
    .then(result=>{
        console.log(result);
        res.json(result)})
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอบทความ"})
    })
}

exports.getpost = (req,res)=>{
    const {slug} = req.params
    postDB.findOne({slug})
    .then((result)=>{
        // console.log(blog);
        res.json(result)
    })
}

exports.remove = (req,res)=>{
    const {slug} = req.params
    console.log(slug);
    postDB.findOneAndDelete({slug})
    .then((result)=>{
        console.log(result);
        if(!result){
            res.json({message:"ไม่เจอ post"})      
        }else{
            res.json({message:"ลบ post เรียบร้อย"})      
        }
    })
    .catch((err)=>{
        if(!result){
            res.json({message:"ไม่เจอ post"})}
        res.json(err)
    })
}

exports.update = (req,res)=>{
    const {slug} = req.params
    const {title,content,author,tag,img_post} = req.body
    console.table({title,content,author,tag,img_post});
    // console.table({name,email,tel,username,password,details,birhday,is_admin});
    postDB.findOneAndUpdate({slug},{title,content,author,tag,img_post},{new:true})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        // console.log(err);
        res.status(400).json({error:"แก้ไขไม่สำเร็จ"})
    })
}

exports.searchPost = (req,res)=>{
    const {input} = req.body
    console.log(input);

    postDB.find({"title": {$regex: '^' + input, $options: 'i'}})
    .then((result)=>{
        console.log(result);
        if(result == ""){
            res.json("ไม่เจอบทความ")
        }
        else{
            res.json(result)
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err)
    })
} 

exports.updateIMG = (req,res) =>{
    let upload = multer({ storage: storage_img_post, fileFilter: imageFilterIMG }).single('content_img');
    const {slug} = req.params

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

        postDB.findOneAndUpdate({slug},{"img_post":req.file.filename},{new:true})
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