require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
require('./db');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
const userRouter = require('./routes/user');

app.use(cors());
app.use('/api/user', userRouter);
app.use(errorHandler);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`the server is listening on port ${PORT}`);
});
