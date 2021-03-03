require('dotenv').config();

const Mongoose = require('mongoose');

const Express = require('express');

const app = Express();

const BodyParser = require('body-parser');

app.use(BodyParser.json());

const ProductRoute = require('./routes/product.route');

app.use('/', ProductRoute);

(async () => {
  await Mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
