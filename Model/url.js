const mongoose =require('mongoose');

const urlSchema=new mongoose.Schema({
    shortUrl:{
        type:String,
        require:true,
        
    },
    redirectUrl:{
        type:String,
        require:true,
    },
    visitHistory:[{timestamp:{type: Number}}],
    createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
    },
}, {timestamps:true})

const urlModel= mongoose.model('url',urlSchema);

module.exports=urlModel;