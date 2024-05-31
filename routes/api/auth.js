const express=require('express')
const router=express.Router();
const User=require('../../models/User')
const md5=require('md5')
const jwt=require('jsonwebtoken')
const {secret}=require('../../config/config')




// 登录
 
router.post('/login',(req,res)=>{ 
    let {username,password}=req.body
  
   User.findOne({username:username,password:md5(password)}).then(data=>{
        if(data===null){
           
            return   res.json({
            code:'2002',
            msg:'用户名或密码错误',
            data:null
        })
       
        }
        // 登录成功后响应
        let token=jwt.sign({
            username:data.username,
            _id:data._id
        },secret,{
            expiresIn:60*60*24
        }
        
    )
        res.json({
            code:'0000',
            msg:'登录成功',
            data:token
        })
        req.session.username=data.username
        req.session._id=data._id
        res.render('success',{message:'登录成功',url:'/account'})
   }).catch((err)=>{
    
        res.json({
            code:'2001',
            msg:'读取失败',
            data:null
        })
   })
})

    // 退出登录
    router.post('/logout',(req,res)=>{ 
    
        req.session.destroy(()=>{
            res.render('success',{message:'退出成功',url:'/login'})
        })
        res.render('auth/login')
    })

module.exports=router