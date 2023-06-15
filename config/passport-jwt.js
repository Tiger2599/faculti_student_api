const passport = require('passport');
const Admin = require('../model/register');
const faculty = require('../model/faculty');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'paras' 
}

passport.use(new JwtStrategy(opts,async(user,done)=>{
    let data =await Admin.findOne({email:user.data.email});
    if(data){
        if(data.password == user.data.password){
            return done(null,data);
        }
        else{
            return done(null,false);
        }
    }else{
        return done(null,false);
    }
}));

passport.use('faculty',new JwtStrategy(opts,async(user,done)=>{
    let data =await faculty.findOne({email:user.data.email});
    if(data){
        if(data.password == user.data.password){
            return done(null,data);
        }
        else{
            return done(null,false);
        }
    }else{
        return done(null,false);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    let data = await Admin.findById(id);
    if(data){
        return done(null,data);
    }
    else{
        let facData = await faculty.findById(id);
        if(facData){
            return done(null,facData);
        }
        else{
            return done(null,false);
        }
    }
})

passport.setAuthnticate=(req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role=='admin'){
            res.locals.admin = req.user;
        }else{
            res.locals.faculty = req.user;
        }
    }
    next();
}

module.exports = passport;