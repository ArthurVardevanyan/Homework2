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
