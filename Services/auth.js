/*stateful authentication: here we are maintaining the state of the user using a hash map. Hash map link user with sessionId so that, that particular user
has his own complete session.

const sessionIdToUserIMap= new Map()

function setUser(sessionId, user){
    sessionIdToUserIMap.set(sessionId,user);
}

function getUser(sessionId){
    return sessionIdToUserIMap.get(sessionId);
}

stateless authentication: here instead of maintaining the state of the user we assign all the values that was previously stored in state(hashmap), like
user(contains his name, his email...) linked with sessionId, within a token(randomly generated string that has key-value pairs) and we store that token
within cookie*/

const jwt=require('jsonwebtoken')
const secret="Yash@$123456789@$"

function setUser(user){
    const token =jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret)
    
    return token;
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return null;
    }
}


module.exports={
    setUser,
    getUser,
}