const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'it must have a name']
  },
  description: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'you must add a price']
  },
  image: {
    type: String
  },
  reviews: []
});

const Instrument = mongoose.model('Instrument', schema);
module.exports = Instrument;
