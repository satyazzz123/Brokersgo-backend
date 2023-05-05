import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/users.js'
import { houseRouter } from './routes/house.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use("/auth",userRouter)
app.use("/home",houseRouter)
mongoose.connect("mongodb+srv://iamjignyasa:jig2127@store.o5vkvgh.mongodb.net/store?retryWrites=true&w=majority")
app.listen(3001,()=>{
    console.log("server connected")
})