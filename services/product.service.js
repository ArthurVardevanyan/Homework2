const Product = require('../models/product.model');

exports.getAll = async (query) => Product.find(query).select('-_id -__v');
exports.getProductsSku = async (sku) => Product.findOne({ sku }).select('-_id -__v');
exports.post = async (body) => new Product(body).save();
exports.deleteAll = async (query) => (await Product.deleteMany(query)).deletedCount;
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
