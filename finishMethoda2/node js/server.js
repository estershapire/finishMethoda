let express=require('express')
let bd=require('body-parser')



let status=require('./routers/status/status')
let transition=require('./routers/transition/transition')













let cors=require('cors')

let app=express()

app.use(cors())
app.use(bd.json())
app.use(bd.urlencoded())


app.get('/', (req,res) => {
    res.json({name:'methoda'})   
})
app.use('/status',status)
app.use('/transition',transition)





app.listen(3000,()=>console.log('app is listening in localhost:3000'))