const jwt = require("jsonwebtoken");
const secret = "Farhan@dev"

const generateToken =  (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        profileImage: user.profileImage,
    }
    const token = jwt.sign(payload, secret);
    return token;
}
const verifyUser = (token) => {
    const payload = jwt.verify(token, secret)
    return payload;
}


module.exports={
    verifyUser,
    generateToken
}