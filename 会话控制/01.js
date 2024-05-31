const express=require('express')
const cookieParser=require('cookie-parser')

const app=express()
app.use(cookieParser())


app.get('/set-cookie',(req,res)=>{
    // res.cookie('name','chen')
    // 服务器设置set-cookie   发给浏览器
    res.cookie('name','chen',{maxAge:80000})
    res.cookie('theme','blue')
    res.cookie('test','test')
    res.send('home')
})

// 删除cookie
app.get('/remove-cookie',(req,res)=>{
    res.clearCookie('name') 
    res.send('删除成功')
})


// 获取cookie
app.get('/get-cookie',(req,res)=>{
    console.log(req.cookies)
    res.send('获取 cookie')
})

app.listen(3000)