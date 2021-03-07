const Product = require('../models/product.model');
const Service = require('./service');

exports.getAll = async (query) => Service.getAll(query, Product);
exports.post = async (body) => Service.post(body, Product);
exports.deleteAll = async (query) => Service.deleteAll(query, Product);

exports.getProductsSku = async (sku) => Product.findOne({ sku }).select('-_id -__v');
exports.deleteProductSku = async (sku) => (await Product.deleteOne({ sku })).deletedCount;
exports.putProductSku = async (sku, product) => Product.findOneAndReplace({ sku }, product,
  { upsert: true });
exports.patchProductSku = async (sku, product) => {
  // Check if all inputted keys are valid before attempted to update item.
  // https://stackoverflow.com/a/61350899
  const allowedMethods = ['sku', 'name', 'quantity', 'price']; // Maybe find a better way than hard coding this.
  const isValidOperation = Object.keys(product).every((param) => allowedMethods.includes(param));

  if (await this.getProductsSku(sku) == null) {
    return null;
  } if (!isValidOperation) {
    return -1;
  }
  return Product.findOneAndUpdate(
    { sku }, product,
    {
      new: true,
    },
  ).select('-_id -__v');
};
