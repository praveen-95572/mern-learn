const mongoose= require('mongoose');
const bcrypt = require('bcryptjs'),
                SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

});

// we are hashing the password
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            user.cpassword=hash;
            next();
        });
    });
});

/*
userSchema.pre('save' , async function(next){
    console.log("Hi from inside");
    if(!this.isModified('password')){
        this.password = bcrypt.hash(this.password , 12);
        this.cpassword = bcrypt.hash(this.cpassword , 12);  
        
    }
    next();
        
}); */

// we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:newToken});
        await this.save();
        return newToken;
    }
    catch(err){
        console.log(err);
    }
}

//Storing the message

userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        this.messages = this.messages.concat({name,email,phone,message});
        await this.save();
        return this.messages;
        
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model("USER",userSchema);

module.exports = User ;