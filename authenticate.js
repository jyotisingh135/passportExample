var {users} =require('./loginmodal.js');
var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');

    users.findByToken(token).then((user)=>{
        if(!user){
            return new Promise.reject();
        }
        console.log(user);
        req.user=user;
        req.token=token;
        next();

    }).catch((e)=>{
        res.status(401).send();
    });
}
module.exports=authenticate;