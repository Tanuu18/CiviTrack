import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["citizen","officer","admin"],
            default:"citizen",
        },
        phone: {
         type: String
          },

         department: {
          type: String
           },

          designation: {
           type: String
             },

          officerId: {
           type: String
             },

          area: {
           type: String
           },
           
    },
    {
        timestamps:true
    }
)

const User=mongoose.model("User",userSchema);
export default User;