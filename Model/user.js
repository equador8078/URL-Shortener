const mongoose= require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    }

},{timestamps:true})

const USER= mongoose.model('user', userSchema);

module.exports=USER;