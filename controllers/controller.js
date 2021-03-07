const Error = require('./error');

exports.deleteCountResponse = (count) => (count > 0 ? 200 : 404);

exports.getAll = async (request, response, Service) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.getAll(request.query));
  });
};

exports.post = async (request, response, Service) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await Service.post(request.body);
    response.sendStatus(201);
  });
};

exports.deleteAll = async (request, response, Service) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(this.deleteCountResponse(
      await Service.deleteAll(request.query),
    ));
  });
};
