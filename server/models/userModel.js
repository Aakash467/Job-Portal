import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        rewquired : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role :{
        type : String,
        enum : ['Student', 'Recruiter'],
        default : 'Student',
        required : true
    },
    profile : {
        bio:{
            type:String,
        },
        skills: {
            type: [String],
            default: []
        },
        resume : {
            type: String,
            default: ''
        },
        resumeFileName:{
            type: String,
            default: ''
        },
        profilePicture: {
            type: String,
            default: ''
        },
        company:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Company'
        }
    }

});

const User = mongoose.model("User", userSchema);
export default User;