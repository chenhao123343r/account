const jwt=require('jsonwebtoken')


let token=jwt.sign(

    {username:'chentest'},
    'abc',
    {expiresIn:1000}
)

jwt.verify(token,'abc',(err,data)=>{
    if(err){
        console.log('认证失败')
        return
    }
    console.log(data)
})