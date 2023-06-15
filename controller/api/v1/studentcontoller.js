const student = require('../../../model/newStudent');
const faculty = require('../../../model/faculty');

module.exports.register = async (req,res)=>{
    // try {
    //     req.body.role = "student";
    //     let studentData = await student.create(req.body);
    //     let facultyData = await faculty.findById(req.body.facultyId);
    //     await facultyData.studenId.push(studentData.id);
    //     let data = await faculty.findByIdAndUpdate(facultyData.id,{studenId:facultyData.studentId});
    //     if(data){
    //         return res.json({status:200,"msg":"data add"});
    //     }
    //     else{
    //         return res.json({status:500,"msg":"something is wrong"});
    //     }
    // } catch (err) {
    //     console.log(err);
    // }

    try {
        req.body.role = 'student';
        let studentData = await student.create(req.body);
        let facultyData = await faculty.findById(studentData.facultyId);
        await facultyData.studentId.push(studentData.id);
        let faculty_update = await faculty.findByIdAndUpdate(facultyData.id,{studentId:facultyData.studentId});
        if(faculty_update){
            return res.json({status:200,"msg":"data add"});
        }
        else{
            return res.json({status:500,"msg":"something is wrong"});
        }
    } catch (err) {
        console.log(err);
    }
}