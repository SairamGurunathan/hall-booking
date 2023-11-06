const mongoose = require('mongoose');


const createRoom = new mongoose.Schema({
    numberOfSeats : {
        type: String,
        required : true,
    },
    amenities : {
        type : Array,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    customerName : {
        type : String,
    },
    date : {
        type : String,
    },
    startTime : {
        type : String,
    },
    endTime : {
        type : String,
    },
    roomID : {
        type : String,
        required : true,
    },
    booked : {
        type:Boolean,
        required:true,
    }
})

const hBooking = mongoose.model('newHall', createRoom);

module.exports = hBooking;