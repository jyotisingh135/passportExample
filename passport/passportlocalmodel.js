var mongoose=require('mongoose');
var validator=require('validator');
var UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        trim:true,
    },
    city:{
        type:String,
        required:true,
        minlength:5,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        minlength:5,
        trim:true,
        unique:true,
        validate:{validator:validator.isEmail,
            message  :`Email is not a valid email`  }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]


});
var localusers=mongoose.model('localusers',UserSchema);
module.exports={localusers};