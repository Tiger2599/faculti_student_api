const express = require('express');
const routes = express.Router();
const controller = require('../controller/index');
const passport = require('passport');
const student = require('../model/student');

routes.post('/register',controller.register);
routes.get('/getData',passport.authenticate('jwt',{failureRedirect:'/login'}) ,controller.getData);
routes.delete('/DeletData/:id',controller.DeletData);
routes.put('/Updatedata/:id',controller.Updatedata);
routes.post('/login',controller.login);
routes.post('/AddAllData',student.upavtar,controller.AddAllData);
routes.get('/logout',(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return res.json({status:500,"msg":"cant logout"});
        }else{
            return res.json({status:200,"msg":"you log out"});
        }
    })
});

routes.use('/faculty',require('../router/api/v1/facultyrouter'));
routes.use('/student',require('../router/api/v1/studentrouter'));

module.exports = routes;