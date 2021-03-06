const User = require('../models/user.model');

exports.getUsers = async (query) => User.find(query).select('-_id -__v');
exports.getUser = async (ssn) => User.findOne({ ssn }).select('-_id -__v');
exports.postUser = async (body) => new User(body).save();
exports.deleteUsers = async (query) => (await User.deleteMany(query)).deletedCount;
exports.deleteUser = async (ssn) => (await User.deleteOne({ ssn })).deletedCount;
exports.putUser = async (ssn, user) => User.findOneAndReplace({ ssn }, user,
  { upsert: true });
exports.patchUser = async (ssn, user) => {
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
