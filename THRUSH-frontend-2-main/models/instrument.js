const mongoose = require("mongoose");
const InstrumentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "it must have a name"],
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        stock: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "you must add a price"],
        },
        reviews: [],
    },
    {
        timestamps: true,
    }
);
const Instrument =
    mongoose.models.Instrument || mongoose.model("Instrument", InstrumentSchema);
export default Instrument;