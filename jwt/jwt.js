const jwt = require("jsonwebtoken")
const secretKey = process.env.secretKey

const tokenGeneration = (data)=>{

    const token = jwt.sign(data,secretKey,{expiresIn:'1h'});
    return token;
}
// we created a token in jwt 
// in classic way 
// refer readme file for more about jwt!

const verifyToken=(token)=>{
    
   
    try{
        const decoded = jwt.verify(token,secretKey);
        console.log(decoded)
        return decoded;
    }
    catch(error){
        throw new Error('Invalid token')
    }


}


module.exports = { tokenGeneration,verifyToken}