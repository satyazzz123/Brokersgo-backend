import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js"
const router = express.Router()

// TO REGISTER A NEW USER
router.post("/register", async (req, res) => {
    const { username, password } = req.body;//destructring(to get exactly what we need)

    const user = await UserModel.findOne({ username });
    if (user) {
        return res.json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newuser = new UserModel({ username, password: hashedPassword })
    await newuser.save()
    res.json({ message: "User registered Successfully", user })

})
// TO LOGIN A USER
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username })
    if (!user) {
        return res.json({ message: "User dosen't exist" })
    }
    let isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.json({ message: "Incorrect Credentials" })
    }
    const token = jwt.sign({ id: user._id }, "secret")
    res.json({ token, userId: user._id })


})


// TO DISPLAY USEROWNER NAME THROUGH USERID

router.get("/:userId", async (req, res) => {
    const user = await UserModel.findById(req.params.userId)
    res.json(user)

})

export { router as userRouter }
export const verifytoken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",(err)=>{
            if(err){
                return res.sendStatus(403)
            }
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}


