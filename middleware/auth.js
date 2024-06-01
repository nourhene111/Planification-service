const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
 
console.log(req.header('Authorization'));
    const token =req.header('Authorization');
     

    if(!token){
        return res.status(401).send('Access deniend !!')
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
  
    req.payload=decoded
    next();
}