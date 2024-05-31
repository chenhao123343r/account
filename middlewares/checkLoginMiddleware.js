//  声明中间件
let   checkLoginMiddleware=(req,res,next)=>{
    // 判断是否
    if(!req.session.username){
      return res.redirect('/login')
    }
    next()
}


module.exports=checkLoginMiddleware