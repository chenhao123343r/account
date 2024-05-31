const express=require('express')
const router=express.Router();
const User=require('../../models/User')
const md5=require('md5')

// 注册
router.get('/reg',(req,res)=>{ 
    res.render('auth/reg')
})
router.post('/reg',(req,res)=>{ 
    User.create({...req.body,password:md5(req.body.password)}).then(data=>{
        res.render('success',{message:'注册成功',url:'/login'})
    }).catch(err=>{
       res.status(500).send('创建用户失败')
    })
})

// 登录
router.get('/login',(req,res)=>{ 
    
    res.render('auth/login')
})
// 
router.post('/login',(req,res)=>{ 
    let {username,password}=req.body
  
   User.findOne({username:username,password:md5(password)}).then(data=>{
        if(data===null){
            return res.send('账号或者密码错误')
        }
        // 登录成功后响应
        req.session.username=data.username
        req.session._id=data._id
        res.render('success',{message:'登录成功',url:'/account'})
   }).catch((err)=>{
        res.status(500).send('登录失败请稍后再试')
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