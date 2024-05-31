const express=require('express')

const app=express()

// 引入 express-session 中间件
const session = require('express-session');
// 引入 connect-mongo，用于将 session 存储在 MongoDB
const MongoStore = require('connect-mongo');

// 使用 session 中间件
app.use(session({
    name: 'sid',  // 设置 cookie 名称，默认是 connect.sid
    secret: 'ch',  // 设置用于签名 session ID cookie 的秘密，防止篡改
    saveUninitialized: false,  // 强制创建 session，即使用户未登录
    resave: true,  // 每次请求时候 重新保存session  
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/bilibili'  // MongoDB URL，用于存储 session 数据
    }),
    cookie: {
        httpOnly: true,  // 设置标记为 httpOnly，客户端 JavaScript 不能读取 cookie
        maxAge: 1000 * 60 *5  // 设置 cookie 的过期时间，这里是 300 秒 session也一样
    }
}));




app.get('/',(req,res)=>{

    res.send('home')
})

// session 设置
app.get('/login',(req,res)=>{
    let {username,password}=req.query
    if(username==='admin'&&password==='admin'){
        // 设置session信息
        req.session.username='admin'
        req.session.uid='afassadasdasdasda'
        res.send('登录成功')
    }else{
        res.send('失败')
    }
})

// session的读取
app.get('/cart',(req,res)=>{
    if(req.session.username){
        res.send(`购物车页面 欢迎您 ${req.session.username}`)
    }else{
        res.send('您还没登录')
    }
})
// session的销毁
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.send('退出成功')
    })
})




app.listen(3000)