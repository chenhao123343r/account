const express=require('express')
// 导入第三方库cookie-parser
const cookieParser=require('cookie-parser')

const app=express()
// 设置为中间件
app.ues(cookieParser())


// 设置cookie 当浏览器访问 返回cookie给浏览器
app.get('/set-cookie',(req,res)=>{
    res.cookie('name','chen',{maxAge:60000})
    res.send('已经发送给浏览器cookie')
})


// 删除cookie
app.get('remove-cookie',(req,res)=>{
    // 删除cookie用clearCookie
    res.clearCookie('name')
})

// 获取cookie
app.get('get-cookie',(req,res)=>{
    console.log(req.cookies)
    res.send('获取 cookie')
})

app.listen(3000)

