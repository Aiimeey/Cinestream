const express = require('express');
const morgan = require('morgan');
require('./db');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`the server is listening on port ${PORT}`);
});
