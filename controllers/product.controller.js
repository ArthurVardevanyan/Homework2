const ProductService = require('../services/product.service');
const Controller = require('./controller');

exports.getProducts = async (request, response) => {
  Controller.getAll(request, response, ProductService);
};
exports.postProduct = async (request, response) => {
  Controller.post(request, response, ProductService);
};
exports.deleteProducts = async (request, response) => {
  Controller.deleteAll(request, response, ProductService);
};

exports.getProductsSku = async (request, response) => {
  await Controller.doActionThatMightFailValidation(request, response, async () => {
    const getResult = await ProductService.getProductsSku(request.params.sku);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

exports.deleteProductSku = async (request, response) => {
  await Controller.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(Controller.deleteCountResponse(
      await ProductService.deleteProductSku(request.params.sku),
    ));
  });
};

exports.putProductSku = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await Controller.doActionThatMightFailValidation(request, response, async () => {
    await ProductService.putProductSku(sku, product);
    response.sendStatus(200);
  });
};

exports.patchProductSku = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  await Controller.doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await ProductService.patchProductSku(sku, product);
    if (patchResult != null && typeof patchResult === 'object') {
      response.json(patchResult);
    } else if (patchResult === -1) {
      response.sendStatus(422); // Added Malformed Input Check, UnProcessable Entity.
    } else {
      response.sendStatus(404);
    }
  });
};
