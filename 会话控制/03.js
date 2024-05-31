const jwt=require('jsonwebtoken')

// 1 生成token
let token=jwt.sign(
    {username:'chentest'},
    'abc',
    {
        expiresIn:30
    }
)
// 2 校验token

console.log(token)
let t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoZW50ZXN0IiwiaWF0IjoxNzE2OTcwNzU2LCJleHAiOjE3MTY5NzA3ODZ9.hKN9ZxZ0NErBAB6KuevQgCCrCdCkrntDrpAD8MhntK4"
jwt.verify(t,'abc',(err,data)=>{
    if(err){
        console.log('认证失败')
        return
    }
    console.log(data)
})