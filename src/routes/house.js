import express from "express";
import { UserModel } from "../models/Users.js"
import { HouseModel } from "../models/House.js"
import { verifytoken } from "./users.js";
const router = express.Router()


//DISPLAY ALL HOUSES IN DATABASE

router.get("/", async (req, res) => {
    try {
        const response = await HouseModel.find({})
        res.json(response)
    } catch (error) {
        console.log(error)
    }

})

//CREATE A NEW POST FOR HOUSE

router.post("/",async (req, res) => {
    const houses = new HouseModel(req.body)
    try {
        const response = await houses.save()
        res.json(response)

    } catch (error) { 
        console.log(error);
    }
})

//USERS TO FAVOURITE

router.put("/show", async (req, res) => {

    try {
        const house = await HouseModel.findById(req.body.houseId);
        const user = await UserModel.findById(req.body.userId)
        user.savedHouses.push(house)
        await user.save()
        res.json({ savedHouses: user.savedHouses })

    } catch (error) {
        res.json(error)
    }
});

//DISPLAY THE SAVED OPTIONS ID

router.get("/savedHouses/ids/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        res.json({ savedHouses: user?.savedHouses })

    } catch (error) {
        console.log(error);
    }

})

//GET SAVED OPTIONS

router.get("/savedHouses/:userId", async (req, res) => {
    try {

        const user = await UserModel.findById(req.params.userId)
        const savedHouses = await HouseModel.find({ _id: { $in: user.savedHouses } })
        res.json({ savedHouses })
    } catch (error) {

        console.log(error);
    }
})
//unsave option
router.get("/savedHouses/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        const house = await HouseModel.findById(req.body.houseId)
        const savedHouses = await HouseModel.find({ _id: { $in: user.savedHouses } })

        savedHouses.findByIdAndRemove.push({ id: HouseModel._id })

        res.json({ savedHouses })
    } catch (error) {
        console.log(error);
    }
})


//TO GET DETAILS OF ONE PARTICULAR HOUSE

router.get("/:houseId", async (req, res) => {
    try {
      const result = await HouseModel.findById(req.params.houseId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// router.post("/delete/:userId", async (req, res) => {
//     const user = await UserModel.findById(req.params.userId)
//     const houseId = req.body.houseId
//     try {
//         user.savedHouses.deleteOne({houseId}, function (error, res) {
//             console.log(error)
//             res.send({ status: "ok", data: "deleted" })
//         })



//     } catch (error) {
//         console.log(error)
//     }

// })
export { router as houseRouter }