var mongoose=require('mongoose');
var validator=require('validator');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
var UserSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,

    },

    email: {
        type: String,
        required: true,
        validate:{validator:validator.isEmail,
    message  :`Email is not a valid email`  }
    }
});

var users=mongoose.model('users',UserSchema);
module.exports={users};