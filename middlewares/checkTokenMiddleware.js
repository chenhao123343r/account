const jwt=require('jsonwebtoken')
const {secret}=require('../config/config')

const checkTokenMiddleware=(req,res,next)=>{
    // 获取token
    let token=req.get('token')
    // 判断是否有token

    if(!token){
        // 返回获取失败的json
        return res.json({
            code:'2003',
            msg:'token 缺失',
            data:null
        })
    }
    jwt.verify(token,secret,(err,data)=>{
      if(err){
            // 返回获取失败的json
            return res.json({
              code:'2004',
              msg:'token 验证失败',
              data:null
          })
      }
        // 保存用户的信息 
        // 在JavaScript中使用 jwt.verify() 函数时，
        // req.user=data 这行代码的作用是将解码后的JWT（JSON Web Token）中的数据存储到请求对象 req 的 user 属性中。
        // 这样做的目的是为了在后续的请求处理中能够方便地访问到用户信息。
         req.user=data
        // 如果 则跳校验成功 的下一个请求
      next()
  })

}

module.exports=checkTokenMiddleware