exports.doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(new Error('Request Error: '.concat(e.message)));
    response.sendStatus(
      e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

exports.deleteCountResponse = (count) => (count > 0 ? 200 : 404);

exports.getAll = async (request, response, Service) => {
  await this.doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.getAll(request.query));
  });
};

exports.post = async (request, response, Service) => {
  await this.doActionThatMightFailValidation(request, response, async () => {
    await Service.post(request.body);
    response.sendStatus(201);
  });
};

exports.deleteAll = async (request, response, Service) => {
  await this.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(this.deleteCountResponse(
      await Service.deleteAll(request.query),
    ));
  });
};
