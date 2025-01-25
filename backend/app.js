const express = require('express');
const morgan = require('morgan');
require('express-async-errors');  
require('./db');
const { errorHandler } = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);
app.get('/async-error', async (req, res) => {

  throw new Error();
});
app.use(errorHandler);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`the server is listening on port ${PORT}`);
});
