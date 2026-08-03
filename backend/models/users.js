import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 name:{
  type: String,
  minlength: 2,
  maxlength: 30,
  required: false,
  default: "Jacques Cousteau"
 },
 email:{
  type:String,
  unique:true,
  required:true
 },
 hashPassword:{
  type:String,
  minlength:8,
  required:true,
  select:false
 },
 refreshToken:{
  type:String,
  select:false
 },

 about:{
  type:String,
  minlength:2,
  maxlength:30,
  required:false,
  default: "Explorer"
 },
 avatar:{
  type:String,
  required:false,
  default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg"
 }
},{
  bufferCommands:false
})
export const User = mongoose.model('User', userSchema);