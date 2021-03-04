const ProductService = require('../services/product.service');
const Error = require('./error');

exports.getProducts = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.json(await ProductService.getProducts(request.query));
  });
};

exports.getProductsSku = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const getResult = await ProductService.getProductsSku(request.params.sku);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

exports.postProduct = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await ProductService.postProduct(request.body);
    response.sendStatus(201);
  });
};

exports.deleteProducts = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((
      await ProductService.deleteProduct(request.query).deletedCount > 0 ? 200 : 404));
  });
};

exports.deleteProductSku = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((
      await ProductService.deleteProductSku(request.params.sku)).deletedCount > 0 ? 200 : 404);
  });
};

exports.putProductSku = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await ProductService.putProductSku(sku, product);
    response.sendStatus(200);
  });
};

exports.patchProductSku = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await ProductService.patchProductSku(sku, product);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};
