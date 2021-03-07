exports.getAll = async (query, Model) => Model.find(query).select('-_id -__v');
exports.post = async (body, Model) => new Model(body).save();
exports.deleteAll = async (query, Model) => (await Model.deleteMany(query)).deletedCount;
