const express = require('express');
const port = 8001;
const app = express();
const db = require('./config/mongoose');

app.use(express.urlencoded());

const passport = require('passport');
const jwt = require('./config/passport-jwt');
const session = require('express-session');

app.use(session({
    name:'admin',
    secret:'admin_log',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthnticate);

app.use('/',require('./router/index'));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is runiing on localhost:${port}`);
})