const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
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
    cource:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    facultyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'faculty',
        required:true
    }
})

const NewStudent = mongoose.model('NewStudent',StudentSchema);

module.exports = NewStudent;