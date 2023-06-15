const express = require('express');
const routes = express.Router();
const controller = require('../../../controller/api/v1/facultyController');
const passport = require('passport');

routes.get('/loginfaild',async(req,res)=>{
    return res.json({status:500,"msg":"login first"});
})

routes.post('/facutyRegister',passport.authenticate('jwt',{failureRedirect:"/faculty/loginfaild"}),controller.register);
routes.post('/facultyLogin',controller.facultyLogin);
routes.get('/GetfacultyData',passport.authenticate('faculty',{failureRedirect:"/faculty/loginfaild"}),controller.GetfacultyData);
// routes.get('/myprofile',(req,res)=>{
//     return res.json({status:200,"msg":req.user});
// });

module.exports = routes;