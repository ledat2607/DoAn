const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Điền tên mã giảm giá!"],
        unique: true,
    },
    code:{
        type: String,
        required: true,
    },
    minAmount:{
        type: Number,
    },
    maxAmount:{
        type: Number,
    },
    shopId:{
     type: String,
     required: true,
    },
    selectedProduct:{
     type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);