var express = require('express');
var router = express.Router();
const Account =require('../../models/Account')
const shortid=require('shortid')
const moment=require('moment')
const checkLoginMiddleware =require('../../middlewares/checkLoginMiddleware')


router.get('/',(req,res)=>{
  res.redirect('/account')
})


// 记账本的列表
router.get('/account',checkLoginMiddleware,(req,res)=>{

// 获取所有的账单信息
Account.find().sort({time:-1}).then(accounts=>{
    console.log(accounts)
    res.render('list',{accounts,moment})
}).catch(err=>{
  res.status(500).send('显示错误')
  return
})
  
})
router.get('/account/create',checkLoginMiddleware,(req,res)=>{
  res.render('create')
})
router.post('/account',(req,res)=>{
  
  // 生成id
  let id=shortid.generate()
  
  // 写入文件
  // db.get('accounts').unshift({id:id,...req.body}).write()
  Account.create({...req.body,time:moment(req.body.time).toDate()}

  ).then(data=>{
    console.log(data)
    res.render('success',{message:'添加成功',url:'/account'})
  }).catch(err=>{
    res.status(500).send('插入失败')
  })

})

// 删除记录
router.get('/account/:id',(req,res)=>{
  let id=req.params.id
  //  db.get("accounts").remove({id}).write()
  Account.deleteOne({_id:id}).then(data=>{
    res.render('success',{message:'删除成功',url:'/account'})
  }).catch(err=>{
    res.status(500).send('删除失败')
  })
   
})

module.exports = router;
