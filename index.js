const express = require('express')
const path =require('path')
const cookieParser=require('cookie-parser')
const { connectionMongoDB } = require('./Connection/connection')
const { userAuthentication,restrictTo} = require('./Middleware/middleware')
const staticRouter=require('./Routes/staticRouter')
const router = require('./Routes/routes')
const userRouter=require('./Routes/user');
const PORT = 8001

const app = express();
connectionMongoDB('mongodb://localhost:27017/urlShortner')

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(userAuthentication)


app.use('/url',restrictTo(["NORMAL","ADMIN"]), router);
app.use('/user',userRouter);
app.use('/', staticRouter)


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})
