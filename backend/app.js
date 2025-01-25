const express = require('express');

require('./db');

const app = express();
app.use(express.json());

const userRouter = require('./routes/user');

app.use('/api/user', userRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`the server is listening on port ${PORT}`);
});
