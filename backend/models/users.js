import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 name:{
  type: String,
  minlength: 2,
  maxlength: 30,
  required: true

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
  required:true
 },
 avatar:{
  type:String,
  required:true
 }
})
export const User = mongoose.model('User', userSchema);