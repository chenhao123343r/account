const express=require('express')

const app=express()

// 引入express-session 中间件
const session=require('express-session') 
const MongoStore=require('connect-mongo')


app.use(
    session({
        name:'sid',
        secret:'ch',
        saveUninitialized:false,
        resave:true,
        store:MongoStore.create({
            mongoUrl:'mongodb://127.0.0.1:27017/bilibili'
        }),
        cookie:{
            httpOnly:true,
            maxAge:1000*60*5
        }

    })
)

// 设置session
app.get('/login',(req,res)=>{
    // 取得查询参数
    let {username,password}=req.query
    if(username==='admin'&&password==='admin'){
        req.session.username='admin'
        req.session.uid='aaaaaaaaaaa'
        res.send('登录成功')
    }else{
        res.send('失败')
    }
})

// session读取
app.get('cart',(req,res)=>{
    if(req.session.username){
        res.send('购物车页面')
    }else{
        res.send('nii您好还为登录')
    }
   
})

// session 销毁

app.get('logout',(req,res)=>{
    req.session.destroy(()=>{
        res.send('退出成功')
    })
})


