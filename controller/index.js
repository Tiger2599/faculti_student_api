const admin = require('../model/register');
const jwt = require('jsonwebtoken');
const student = require('../model/student');

module.exports.register = async (req,res)=>{
    req.body.role = 'admin';
    let checkData = await admin.findOne({email:req.body.email});
    if(checkData){
        return res.json({"status":500,"msg":"this data allready add in data base"})
    }
    else{
        await admin.create(req.body);
        return res.json({"status":200,"msg":"data add"})
    }
}

module.exports.getData = async (req,res)=>{
    let data = await admin.find({});
    return res.json(data);
}

module.exports.DeletData = async (req,res)=>{
    let data = await admin.findById(req.params.id);
    if(data){
        let deletdata = await admin.findByIdAndDelete(data.id); 
        if(deletdata){
            return res.json({"status":200,"msg":"data deleted"});
        }
        else{
            return res.json({"status":500,"msg":"somthing is wrong"});
        }
    }
    else{
        return res.json({"status":500,"msg":"data not available"});
    }
}

module.exports.Updatedata = async (req,res) => {
    let data = await admin.findById(req.params.id);
    if(data){
        let updata = await admin.findByIdAndUpdate(data.id,req.body);
        if(updata){
            return res.json({"status":200,"msg":"data updated"});
        }
        else{
            return res.json({"status":500,"msg":"somthing is wrong"});
        }
    }
    else{
        return res.json({"status":500,"msg":"data not available"});
    }
}

module.exports.login = async (req,res)=>{
    let chcekemail = await admin.findOne({email:req.body.email});
    if(chcekemail){
        if(chcekemail.password == req.body.password){
            let token = jwt.sign({data:chcekemail},"paras",{expiresIn:84600});
            return res.json({"status":200,"msg":token});
        }else{
            return res.json({"status":500,"msg":"invalid enterd data"});
        }
    }
    else{
        return res.json({"status":500,"msg":"data not available"});
    }
}

module.exports.AddAllData = async (req,res)=>{
    try {
        let singleImage = '';
        if(req.files.image){
            singleImage = student.singlePath+'/'+req.files.image[0].filename;
        }
        req.body.image = singleImage;

        let multiimage = [];
        if(req.files.multiImage){
            for(var i=0; i<req.files.multiImage.length; i++){
                multiimage[i] = req.files.multiImage[i].filename;
            }
        }
        req.body.multiImage = multiimage ;

        let chcekc = await student.findOne({email:req.body.email});
        if(chcekc){
            return res.json({"status":500,"msg":"data alredy add"});
        }
        else{
            let data = await student.create(req.body);
            if(data){
                return res.json({"status":200,"msg":"data add"});
            }
            else{
                return res.json({"status":500,"msg":"data not available"});
            }
        }

    } catch (err) {
        console.log(err);
    }
}