const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const singlePath = '/singleimage';
const multipath = '/multiImage';

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    multiImage:{
        type:Array,
        required:true
    }
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname=='image'){
            cb(null,path.join(__dirname,'..',singlePath));
        }
        else{
            cb(null,path.join(__dirname,'..',multipath));
        }
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

studentSchema.statics.upavtar = multer({storage:storage}).fields([{name:'image',maxCount:1},{name:'multiImage',maxCount:5}]);
studentSchema.statics.singlePath = singlePath;
studentSchema.statics.multipath = multipath;

const student = mongoose.model('student',studentSchema);

module.exports = student;