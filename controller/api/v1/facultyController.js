const faculty = require('../../../model/faculty');
const jwt = require('jsonwebtoken');

module.exports.register = async (req,res)=>{
    try {
        req.body.role = 'faculty'
        if(req.body.password === req.body.confirmpassword){
            let checkemail = await faculty.findOne({email:req.body.email});
            if(checkemail){
                return res.json({status:500,"msg":"record alredy add"});
            }
            else{
                let data = await faculty.create(req.body);
                if(data){
                    return res.json({status:200,"msg":"record add"});
                }
                else{
                    return res.json({status:500,"msg":"record not add"});
                }
            }
        }
        else{
            return res.json({status:500,"msg":"password and confirm password are not matched"});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.facultyLogin = async (req,res)=>{
    let chcekemail = await faculty.findOne({email:req.body.email});
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

module.exports.GetfacultyData = async (req,res)=>{
    let data = await faculty.findById(req.user.id).populate('studentId').exec();
    if(data){
        return res.json({status:200,"msg":data});
    }else{
        return res.json({status:500,"msg":'something wrong'});
    }
    // return res.redirect('/faculty/myprofile');
}