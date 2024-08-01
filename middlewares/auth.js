const { verifyUser } = require("../resources/auth");

const validateTheUserCookie =(cookieName)=>{
    return (req, res , next)=>{

        const cookie = req.cookies[cookieName];
        if(!cookie)
          return next();
        const payload = verifyUser(cookie);
        if(payload){
            req.user =payload;
            next()
        }
    }
}
module.exports={
    validateTheUserCookie
}