const mongoose =require('mongoose');

function connectionMongoDB(URL){
    return mongoose.connect(URL)
    .then(()=>{console.log('MongoDB connected!')})
    .catch((err)=>{console.log('MongoDB error', err)})
}

module.exports={
    connectionMongoDB
}