const { createHash, randomBytes } = require('crypto');
const { Schema, model } = require("mongoose");
const { generateToken } = require('../resources/auth')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: '/public/default.png'
    },
    destination: {
        type: String,
        enum: ["USER", "AUTHOR"],
        default: "USER"
    }
}, { timestamps: true })
userSchema.static("checkPasswordAndGenerateToken", async function (email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }
    const hashedPassword = user.password;
    const userPassword = createHash('sha256').update(user.salt + password).digest('hex');

    if (hashedPassword === userPassword) {
        const Token = await generateToken(user);
        return Token;
    }
    else if (hashedPassword !== userPassword) {
        throw new Error("Password is incorrect");

    }

})
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString('hex');
    const hash = createHash('sha256').update(salt + user.password).digest('hex');

    this.salt = salt;
    this.password = hash;
    next();
})
const User = model('users', userSchema);

module.exports = User;
