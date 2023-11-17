const postDB = require("../models/post")
const {storage_img_post,imageFilterIMG} = require("../services/upload_img")
const multer = require('multer');
const slugify = require("slugify")
const {v4:uuidv4} = require('uuid')

exports.create=(req,res)=>{
    console.log(req.body);
    const {title,content,author,tag,img_post} = req.body

    let slug = slugify(title)

    if(!slug){
        slug = uuidv4();
        console.log(slug);
    }

    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนหัวข้อ"})
            break
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break
        case !author:
            return res.status(400).json({error:"กรุณาป้อนชื่อผู้แต่ง"})
            break
    }

    postDB.create({title,content,author,tag,slug,img_post})
    .then((result) => {
        // console.log(result);
        res.json(result)
    })
    .catch((err) => {
        // console.log(error);
        res.json(err)
    });
}

exports.getAllpost = (req,res) =>{
    const {tag} = req.params
    postDB.find({tag})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
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
    console.log(slug);

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