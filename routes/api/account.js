var express = require('express');
var router = express.Router();
const Account =require('../../models/Account')
const shortid=require('shortid')
const moment=require('moment')
const jwt=require('jsonwebtoken')
const checkTokenMiddleware=require('../../middlewares/checkTokenMiddleware')




 

// 记账本的列表
router.get('/account',checkTokenMiddleware,(req,res)=>{

     // 获取所有的账单信息
 Account.find().sort({time:-1}).then(accounts=>{
   
    res.json(
    {
        code:'0000',
        msg:'读取成功',
        data:accounts

    })
}).catch(err=>{
    res.json(
        {
            code:'1001',
            msg:'读取失败',
            data:null

        })

})
      
})

router.post('/account',checkTokenMiddleware,(req,res)=>{
  
  // 生成id
  let id=shortid.generate()
  
  // 写入文件
  // db.get('accounts').unshift({id:id,...req.body}).write()
  Account.create({...req.body,time:moment(req.body.time).toDate()}

  ).then(data=>{
    console.log(data)
   res.json(
    {
        code:'0000',
        msg:'插入成功',
        data:data
    }
   )
  }).catch(err=>{
    res.json(
        {
            code:'1001',
            msg:'插入失败',
            data:null
        }
       )
  })

})

// 删除记录
router.delete('/account/:id',checkTokenMiddleware,(req,res)=>{
  let id=req.params.id
  //  db.get("accounts").remove({id}).write()
  Account.deleteOne({_id:id}).then(data=>{
    res.json(
        {
            code:'0000',
            msg:'删除成功',
            data:data
        }
       )
  }).catch(err=>{
    res.json(
        {
            code:'1001',
            msg:'删除失败',
            data:null
        }
       )
  })
   
})

// 获取单个账单的信息
router.get('/account/:id',checkTokenMiddleware,(req,res)=>{
    let id = req.params.id;  // 从URL中获取id参数
    Account.findById(id).then(data=>{
        res.json({
            code:'0000',
            msg:'取得成功',
            data:data
        })
    }).catch(err=>{
        res.json({
            code:'1006',
            msg:'取得失败',
            data:[]
        })
    })
})

// 更新账单
router.patch('/account/:id', checkTokenMiddleware,(req, res) => {
    const id = req.params.id;  // 从URL中获取id参数
    console.log("Received update for ID:", id);
    console.log("Update data:", req.body);

    // 使用 findByIdAndUpdate 来更新数据并返回更新后的数据
    Account.findByIdAndUpdate(id, req.body, { new: true })  // 设置 new: true 以返回更新后的文档
    .then(data => {
        if (data) {
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data  // 返回更新后的文档数据
            });
        } else {
            // 如果没有找到文档，可能是因为无效的ID
            res.json({
                code: '1007',
                msg: '未找到数据',
                data: []
            });
        }
    })
    .catch(err => {
        console.error("Error updating account:", err);
        res.json({
            code: '1006',
            msg: '更新失败',
            data: []
        });
    });
});
 

module.exports = router;
