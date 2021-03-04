const User = require('../models/user.model');

exports.getUsers = async (query) => User.find(query).select('-_id -__v');
exports.getUser = async (ssn) => User.findOne({ ssn }).select('-_id -__v');
exports.postUser = async (body) => new User(body).save();
exports.deleteUsers = async (query) => User.deleteMany(query);
exports.deleteUser = async (ssn) => User.deleteOne({ ssn });
exports.putUser = async (ssn, user) => User.findOneAndReplace({ ssn }, user,
  { upsert: true });
exports.patchUser = async (ssn, user) => User.findOneAndUpdate(
  { ssn }, user,
  {
    new: true,
  },
).select('-_id -__v');
