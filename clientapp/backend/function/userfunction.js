const mongoose = require('mongoose');
const UserSchema=require('../schema/userschema');
const bcrypt=require('bcrypt');
const User = mongoose.model('users', UserSchema);
var jwt = require('jsonwebtoken');
const JWT_SECRET="z~AAB6693*Jf"
const verifyUserLogin = async (d)=>{
      
     d=JSON.parse(JSON.stringify(d))
     
    try {
        const user = await User.findOne({user_email:d.user_email}).lean()
        console.log(user)
        if(!user){
       
            return {status:'error',error:'User not found'}
        }
        else if(!d.user_password){
            return {status:'error',error:'Password is required for comparison.'}
        }
        else if(await bcrypt.compare(d.user_password,user.user_password)){
            // creating a JWT token
            token = jwt.sign({id:user._id,username:user.user_email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
            return {status:'ok',data:token}
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

const loginuser=async(req,res)=>{
    
    const response = await verifyUserLogin(req.body);
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
        res.send({token:token});
    }else{
        res.status(400).json(response);
    }
}

const registeruser=async (req, resp) => {
    try {
         console.log(req.body)
        const plainTextPassword=req.body.user_password;
        const salt = await bcrypt.genSalt(10);
       
        const password = await bcrypt.hash(plainTextPassword,salt)
        req.body.user_password=password;
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.user_password;
            resp.send(req.body);
            console.log(result);
        } else { 
            console.log("User already register");
        }
 
    } catch (e) {
        console.log(e)
        resp.send("Something Went Wrong");
    }
}

module.exports={loginuser,registeruser}
