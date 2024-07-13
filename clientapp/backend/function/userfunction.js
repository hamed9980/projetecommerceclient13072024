const mongoose = require('mongoose');
const UserSchema=require('../schema/userschema');
const bcrypt=require('bcrypt');
const User = mongoose.model('users', UserSchema);
var jwt = require('jsonwebtoken');
const JWT_SECRET="z~AAB6693*Jf"
const verifyUserLogin = async (email,password)=>{
    
    try {
        const user = await User.findOne({email}).lean()
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(password,user.user_password)){
            // creating a JWT token
            token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
            return {status:'ok',data:token}
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

const loginuser=async(req,res)=>{
    console.log(req.body)
    const {user_email,user_password}=req.body;
    // we made a function to verify our user login
    const response = await verifyUserLogin(user_email,user_password);
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
        res.send({token:token});
    }else{
        res.json(response);
    }
}

const registeruser=async (req, resp) => {
    try {
         
        const plainTextPassword=req.body.body.user_password;
        const salt = await bcrypt.genSalt(10);
       
        const password = await bcrypt.hash(plainTextPassword,salt)
        req.body.body.user_password=password;
        const user = new User(req.body.body);
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
