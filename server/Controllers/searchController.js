const searchDB = require("../models/search")
const {v4:uuidv4} = require('uuid')

exports.create_search=(req,res)=>{
    // console.log(req.body);
    const {category,username} = req.body
    
    if(category == null){
      res.status(400).json({error:"ค้นหาผิดพลาด"})
    }

    searchDB.create({category,username})
    .then((result) => {
        // console.log(result);
        res.json(result)
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({error:"ค้นหาผิดพลาด"})
    });
}

exports.get_search = (req,res)=>{
    searchDB.find({})
    .then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอการค้นหา"})
    })
}

exports.get_searchtop = (req,res)=>{
    searchDB.aggregate([
        {
          $group: {
            _id: "$category",
            total: { $sum: 1 }
          }
        },
        {
          $sort: { total: -1 }
        },
        {
          $limit: 8
        }
      ])
    .then(result=>{
        console.log(result);
        res.json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({error:"ไม่เจอการค้นหา"})
    })
}


