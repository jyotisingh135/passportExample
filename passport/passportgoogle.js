var passport=require('passport');
var express=require('express');
var {users}= require('./passportmodel');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var config=require('./config');
var googleStratergy=require('passport-google-oauth').OAuth2Strategy;
var app=express();
mongoose.Promise=global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3002');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);



    //
    //
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header(`Access-Control-Allow-Methods`, `POST`);
    // res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});
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

passport.use(new googleStratergy({
    clientID:config.googleAuth.clientID,
    clientSecret:config.googleAuth.clientSecret,
    callbackURL:config.googleAuth.callbackURL
}, (accessToken, refreshToken, profile, done)=> {
        // asynchronous // Event Loop
        console.log(profile);

        //find the user in the database based on their facebook id
        users.findOne({ 'id' : profile.id }, (err, user)=> {
            if (err) return done(err);

            // if the user is found, then log them in
            if (user) {
                console.log('usseeecgsdjcgfdsfgdfc',user);
                return done(null, user); // user found, return that user
            } else {
                // if there is no user found with that facebook id, create them
                var newUser = new users({
                    id:profile.id,
                    token:accessToken,
                    name:profile.displayName,
                    email:profile.emails[0].value
                });
                console.log('new usser',newUser);

                // save our user to the database
                newUser.save().then((doc)=>{
                    console.log("Saved User :: = "+doc);
                    return doc;
                }).catch((err)=>{
                    console.log("User Error :: = "+err);
                    return err;
                });
            }
});}
    ));
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect:'http://localhost:3002/home',
        failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });
app.get('/',(req,res)=>{
    res.send({msg:'user'});
});
app.get('/',(req,res)=>{
    console.log('login Unsuccessfull');
    res.send({'msg':'fail'});
});
app.get('/',(req,res)=>{
    console.log('login successfull');
    res.send({'msg':'Success'});
});
app.post('/home/register',(req,res)=>{
    console.log('called');
    var newuser= new users({
        name:req.body.name,
        city:req.body.city,
        username:req.body.username,
        password:req.body.password
    });
    newuser.save().then((data)=>{

    })
})
