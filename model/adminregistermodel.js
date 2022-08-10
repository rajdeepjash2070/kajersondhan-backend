const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	
	name:{
        type:String,
    },
    address:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    contactnumber:{
        type:String,
    },
    avatar:{
        type:String,
    },
    cloudinary_id:{
        type:String,
    },
	verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().label("Name"),
		address: Joi.string().label("Address"),
		email: Joi.string().email().label("Email"),
		password: passwordComplexity().label("Password"),
        contactnumber: Joi.string().contactnumber().label("Contact Number"),
        avatar: Joi.string().avatar().label("Avatar"),
        cloudinary_id:  Joi.string().cloudinary_id().label("Cloudinary_id"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };