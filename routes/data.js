var exp = require('express');
var data = require('../model/datamodel');
const router = exp.Router();
var bodyparser = require('body-parser');
const path = require('path');

router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());



var multer = require('multer');

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, './public/images');  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  });  

  var upload = multer({ storage : storage}).single('bimage');  


  

  router.get("/view/:img",(req,res)=>{        //image controller
    res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img));
})


router.get("/all",(req,res)=>{
     data.find({},(err,result)=>{
		 if (err) throw err;
		 else res.send(result);
    })
})

router.post("/",upload,(req,res)=>{
    var u1 = new data(req.body);
    u1.save((err)=>{
        if (err) throw err;
        else res.send({msg:"data added"});
    })
})

router.post("/mydata",(req,res)=>{ console.log(req.body);
    data.find({username:req.body.username},(err,result)=>{
		 if (err) throw err;
		 else res.send(result);
    })
})

router.post("/viewone",(req,res)=>{ console.log('______________displaying one post___________________');
    data.find({_id:req.body.splitted},(err,result)=>{
		 if (err) throw err;
		 else res.send(result);
    })
})


router.post("/deletepost",(req,res)=>{console.log("deleting post____id: "+req.body._id)
    data.deleteOne({_id:req.body.splitted},(err,result)=>{
        if (err) throw err;
         else
        {
			console.log("deleted post____id: "+req.body.splitted)
            data.find({},(err,result)=>{
                if(err) throw err;
                else res.send(result);
            })
        } 
    })
})



/*  router.get("/:uid",(req,res)=>{
    user.find({username:req.params.uid},(err,result)=>{
        if (err) throw err;
        else{
            console.log(result.length);
            if(result.length!=0)
                res.send({found:true})
                
            else
                res.send({found:false})
        }
    }) */
module.exports = router;