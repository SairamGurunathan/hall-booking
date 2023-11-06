const express = require('express');
const mongoose = require('mongoose');
const hBooking = require('./DB');
const PORT = 5000;
const app = express();

app.use(express.json());

const dbURL = 'mongodb+srv://sairamgurunathan:Sairam%40110793@clustersairam.xkk9ol6.mongodb.net/booking'
mongoose.connect(dbURL).then(()=>{
    console.log('db connect');
}).catch((err)=>{
    console.log(err);
});

app.post("/new-room", async (req,res)=>{
    const {numberOfSeats,amenities,price,roomID,booked} = req.body;

    const oldRoom = await hBooking.findOne({roomID : roomID});
    if(!oldRoom){
        const data = await hBooking.create(req.body);

        res.send({msg : "success", data});
    }
    else{
        res.send({msg : "Room number already exist"});
    }
})

app.put("/room-booking", async(req,res)=>{
    
    const { customerName,date,startTime,endTime,roomID,booked} = req.body;
    const data = {
        customerName,
        date,
        startTime,
        endTime,
        booked
    }

    const postBooking = await hBooking.findOne({roomID:roomID})
    if(!postBooking.customerName){
        const newData = await hBooking.findOneAndUpdate({roomID},data)

        res.send({msg:"Room booked succesfully",newData})
    }
    res.send({msg:"Room already booked"})
    
})

app.get("/list-booking", async(req,res)=>{
    const data = await hBooking.find()
    const {bookedRoom} = req.body
    const bookedRooms = data.filter((value)=>
        value.booked  === bookedRoom
    )
    res.send({bookedRooms})
})

app.listen(PORT,()=>{
    console.log("connected");
})