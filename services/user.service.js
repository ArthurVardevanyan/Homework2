const User = require('../models/user.model');
const Service = require('./service');

exports.getAll = async (query) => Service.getAll(query, User);
exports.post = async (body) => Service.post(body, User);
exports.deleteAll = async (query) => Service.deleteAll(query, User);

exports.getUser = async (ssn) => User.findOne({ ssn }).select('-_id -__v');
exports.deleteUser = async (ssn) => (await User.deleteOne({ ssn })).deletedCount;
exports.putUser = async (ssn, user) => User.findOneAndReplace({ ssn }, user,
  { upsert: true });
exports.patchUser = async (ssn, user) => {
  // Check if all inputted keys are valid before attempted to update item.
  // https://stackoverflow.com/a/61350899
  const allowedMethods = ['ssn', 'firstName', 'lastName', 'age', 'address', 'phone']; // Maybe find a better way than hard coding this.
  const isValidOperation = Object.keys(user).every((param) => allowedMethods.includes(param));

  if (await this.getUser(ssn) == null) {
    return null;
  } if (!isValidOperation) {
    return -1;
  }
  return User.findOneAndUpdate(
    { ssn }, user,
    {
      new: true,
    },
  ).select('-_id -__v');
};
