var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
var accountRouter = require('./routes/api/account');
var authtApiRouter = require('./routes/api/auth');
const authRouter=require('./routes/web/auth')
// 引入 express-session 中间件
const session = require('express-session');
// 引入 connect-mongo，用于将 session 存储在 MongoDB
const MongoStore = require('connect-mongo');

const {DBHOST,DBPORT,DBNAME}=require('./config/config')
 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用 session 中间件 必须配置在所有的路由之前
app.use(session({
  name: 'sid',  // 设置 cookie 名称，默认是 connect.sid
  secret: 'ch',  // 设置用于签名 session ID cookie 的秘密，防止篡改
  saveUninitialized: false,  // 强制创建 session，即使用户未登录
  resave: true,  // 每次请求时候 重新保存session  
  store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/bilibili'  // MongoDB URL，用于存储 session 数据
      // mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`  // MongoDB URL，用于存储 session 数据
  }),
  cookie: {
      httpOnly: true,  // 设置标记为 httpOnly，客户端 JavaScript 不能读取 cookie
      maxAge: 1000 * 60 *60*24  *7// 设置 cookie 的过期时间，这里是 300 秒 session也一样
  }
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', accountRouter);
app.use('/api', authtApiRouter);
app.use('/', authRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
