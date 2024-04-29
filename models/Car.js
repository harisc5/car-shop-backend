import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    productionYear: Number,
    fuel: String,
    hp: Number,
    sold: {type: Boolean, default: false},
    price: Number,
    created: {type: Date, default: Date.now},
    owner: String
});

const Car = mongoose.model('Car', carSchema);

export default Car;