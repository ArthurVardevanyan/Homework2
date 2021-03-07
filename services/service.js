const Product = require('../models/product.model');

exports.getAll = async (query) => Product.find(query).select('-_id -__v');
exports.post = async (body) => new Product(body).save();
exports.deleteAll = async (query) => (await Product.deleteMany(query)).deletedCount;
