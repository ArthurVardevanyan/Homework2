const Product = require('../models/product.model');

exports.getProducts = async (query) => Product.find(query).select('-_id -__v');
exports.getProductsSku = async (sku) => Product.findOne({ sku }).select('-_id -__v');
exports.postProduct = async (body) => new Product(body).save();
exports.deleteProduct = async (query) => Product.deleteMany(query);
exports.deleteProductSku = async (sku) => Product.deleteOne({ sku });
exports.putProductSku = async (sku, product) => Product.findOneAndReplace({ sku }, product,
  { upsert: true });
exports.patchProductSku = async (sku, product) => Product.findOneAndUpdate(
  { sku }, product,
  {
    new: true,
  },
).select('-_id -__v');
