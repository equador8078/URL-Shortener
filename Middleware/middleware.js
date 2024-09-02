const {getUser}= require('../Services/auth')

function userAuthentication(req,res,next){
    const cookieToken=req.cookies?.uid;
    req.user=null;
    console.log('cookie at Authentication:',cookieToken)
    if(!cookieToken) return next()

    const user = getUser(cookieToken);
    console.log('User at Authentication:',user)
    if(!user) return res.redirect('/login')
    
    req.user=user
    return next();
}


function restrictTo(role=[]){
    return (req,res,next)=>{
        if(!req.user) return res.redirect('/login');

        if(!role.includes(req.user.role)) return res.end('Unauthorized')

            return next()
    }
}

module.exports={
    userAuthentication,
    restrictTo
}