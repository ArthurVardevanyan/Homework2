const UserService = require('../services/user.service');
const Controller = require('./controller');
const Error = require('./error');

exports.getUsers = async (request, response) => {
  Controller.getAll(request, response, UserService);
};
exports.postUser = async (request, response) => {
  Controller.post(request, response, UserService);
};
exports.deleteUsers = async (request, response) => {
  Controller.deleteAll(request, response, UserService);
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

exports.deleteUser = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus(
      (await UserService.deleteUser(request.params.ssn)) > 0 ? 200 : 404,
    );
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
      response.sendStatus(422); // Added Malformed Input Check, UnProcessable Entity.
    } else {
      response.sendStatus(404);
    }
  });
};
