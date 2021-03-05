const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  ssn: {
    type: String,
    required: true,
    unique: true,
    min: 11,
    max: 11,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  address: { type: String, required: false },
  phone: { type: String, required: false },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
