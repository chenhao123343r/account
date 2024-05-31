const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义用户模型的 schema
const AccountSchema = new Schema({
    title:{
      type:String,
      required:true
    },
    time:Date,

    type:Number,

    account:{
      type:Number,
      required:true
    },
    remarks:{
      type:String
    }

  });


  const Account=mongoose.model('Account',AccountSchema)


  module.exports=Account
  