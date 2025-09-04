import jwt from 'jsonwebtoken'
const secret ='k1a2i3f4@123456789k1a2i3f4'


function createToken(user){
    const payload ={
        id:user._id,
        name:user.name,
        email:user.email,
    }
    const token =jwt.sign(payload,secret)
    return token
}
function validateUser(token){
const payload =jwt.verify(token,secret)
return payload
}
export {createToken,validateUser}