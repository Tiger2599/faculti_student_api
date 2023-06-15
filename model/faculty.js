const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
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
    role:{
        type:String,
        required:true
    },
    studentId:{
        type:Array,
        ref:'NewStudent',
        required:true
    }
})

const faculty = mongoose.model('faculty',facultySchema);

module.exports = faculty;