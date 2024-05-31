const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义用户模型的 schema
const userSchema = new Schema({
    username: { type: String, required: true,uniqued:true},
    password: { type: String, required: true }
  });


  const User=mongoose.model('User',userSchema)


  module.exports=User
  