const USER=require('../Model/user')
const {setUser}=require('../Services/auth')
const {v4: uuidv4}= require('uuid')

async function handelUserSignup(req,res){
    const {name, email, password, role}= req.body;
    try{
        await USER.create({
            name:name,
            email:email,
            password:password,
            role:role,
        })
    
        return res.render('home',{msg:'user created successfully'})
    }
    catch(errorResponse){
        if(errorResponse.code===11000){
            return res.render('signup',{msg:'User already exists!'})
        }
    }
}

async function handelUserLogin(req,res){

    const {email, password}= req.body;
    try{
        const user= await USER.findOne({
            email:email,
            password:password,
        })


        if(!user) return res.render('login',{msg:'Invalid email or password!'})
            //stateful:
            // const sessionId=uuidv4();
            // setUser(sessionId,user);
            // res.cookie('uid',sessionId)

            //stateless:
            const token= setUser(user);
            //method 1:cookie based authentication where tokens are send within cookie
            res.cookie('uid', token,{
                httpOnly:true
            });

            //method 2: sending token through json response
            // return res.json({token:token})

        return res.redirect('/');
    }
    catch(error){
            return res.render('login',{msg:'Some error ocurred'})
    }
}

module.exports={
    handelUserSignup,
    handelUserLogin,
}

