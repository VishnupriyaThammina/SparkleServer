const bcrypt =require('bcrypt')
const jwt = require('../jwt/jwt')
const User = require('../models/userSchema');
const cookieParser = require('cookie-parser');
const login = async (req,res) => {
    const {username , password} = req.body;
    try{
        const user = await User.findOne({username})
        if(!user || !bcrypt.compareSync(password,user.password,13)){
return res.status(401).json({error:"Invalid credentials. "})}

const token = jwt.tokenGeneration({username:user.username})
res.cookie('token',token,{httpOnly:true,secure:true,sameSite:'Strict'})
console.log(token)
res.status(200).json({token,message:"Login Successful"})
        
    }catch(error){
res.status(500).json({error:"Internal server error"})
    }
}


module.exports = {login}