const UserService = require('../services/user.service');
const Error = require('./error');

exports.getUsers = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.json(await UserService.getUsers(request.query));
  });
};

exports.getUser = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const getResult = await UserService.getUser(request.params.ssn);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

exports.postUser = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await UserService.postUser(request.body);
    response.sendStatus(201);
  });
};

exports.deleteUsers = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((
      await UserService.deleteUsers(request.query).deletedCount > 0 ? 200 : 404));
  });
};

exports.deleteUser = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((
      await UserService.deleteUser(request.params.ssn)).deletedCount > 0 ? 200 : 404);
  });
};

exports.putUser = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await UserService.putUser(ssn, user);
    response.sendStatus(200);
  });
};

exports.patchUser = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.ssn;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await UserService.patchUser(ssn, user);
    if (patchResult != null && typeof patchResult === 'object') {
      response.json(patchResult);
    } else if (patchResult === -1) {
      response.sendStatus(422);
    } else {
      response.sendStatus(404);
    }
  });
};
