
const User =  require("../models/user");
const {normalizeErrors} = require("../helpers/mongoose");
const config = require('../config/dev');
const jwt = require('jsonwebtoken');
exports.auth = function(req,res){

   const { email,password } = req.body;
   if(!password || ! email)
   return   res.status(422).send({errors:[{title:"Data Missing",detail:"Provide email and password "}]});
   
   User.findOne({email},function(err,user){
          if(err){
            return  res.status(422).send({errors:normalizeErrors(err.errors)});
          }
          if(!user){
            return   res.status(422).send({errors:[{title:"Invalid user",detail:"user doenst exsist"}]});
          }

         if( user.hasSamePassword(password)){
            const token = jwt.sign({
               userId: user.id,
               username:user.username
            }, config.SECRET,{expiresIn: '1h'})

            res.json(token);         
             }else{
            return   res.status(422).send({errors:[{title:"Invalid data",detail:"email or password wrong "}]});
         }
})

}

exports.register = function(req,res){

    const { username,email,password,passwordConfirmation } = req.body;
     
    if(!password || ! email)
    return   res.status(422).send({errors:[{title:"Data Missing",detail:"Provide email and password "}]});
    if(password!==passwordConfirmation)
    res.status(422).send({errors:[{title:"Password Missmatch",detail:"confirm password must be same and password "}]});
 
     User.findOne({email},function(err,exixtingUser ){
         if(err){
            return  res.status(422).send({errors:normalizeErrors(err.errors)});
         }
      if(exixtingUser){
        return  res.status(422).send({errors:[{title:"Invalid Email",detail:"user already exists"}]});
      }
      const user = new User({
          username,
          email,
          password
      }); 
         user.save(function(err){
            return  res.status(422).send({errors:normalizeErrors(err.errors)});
         }); 

         return    res.json({'registered':true});
     });
     return  res.json({username,email});

}


module.exports.authMiddleware = (req,res,next)=>{
   const token = req.headers.authorization;
   if(token){
      const user= parseToken(token);
      User.findById(user.userId,function(err,user){
         if(err){
            return  res.status(422).send({errors:normalizeErrors(err.errors)});
         }
         if(user){
            res.locals.user= user;
            next();
         }else{
            return  notAuthorized(res);
            }
      });
   }else{
      return  notAuthorized(res);
   }
}

function parseToken(token){
   return jwt.verify(token.split(' ')[1],config.SECRET);
}

function notAuthorized(res){
   return  res.status(401).send({errors:[{title:"Not authorized",detail:"you need to login"}]});
}