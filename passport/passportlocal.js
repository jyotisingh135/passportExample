var passport=require('passport');
var express=require('express');
var {localusers}= require('./passportlocalmodel');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var localStratergy=require('passport-local').Strategy;
var cors=require('cors');
var app=express();
mongoose.Promise=global.Promise;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/passportlogin',(err,db)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected');
    }
});

app.listen(3001,()=>{
    console.log('started on port 3001');
})
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    users.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new localStratergy((username,password,done)=>{
    localusers.findOne({username:username,password:password},function(err,user){
            if(err){return done(err);}
            if(!user){return done(null,false,{message:'incorrect user'});}
            return done(null,user);
        });
}));
app.post('/home/login',
    passport.authenticate('local',{successRedirect:'/',
                                    failureRedirect:'/fail'},
    ));
app.get('/fail',(req,res)=>{
    console.log('login Unsuccessfull');
    res.send({'msg':'UnSuccess'});
});
app.get('/',(req,res)=>{
    console.log('login successfull');
    res.send({'msg':'Success'});
});
app.post('/home/register',(req,res)=>{
    console.log('called');
    var newuser= new localusers({
        name:req.body.name,
        city:req.body.city,
        username:req.body.username,
        password:req.body.password
    });
    newuser.save().then((data)=>{

    })
})
