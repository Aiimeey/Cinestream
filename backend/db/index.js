const mongoose = require('mongoose');

// Connect to MongoDB database 'Db' using Mongoose
mongoose.connect('mongodb://localhost:27017/Db', {}).then(() => {
  console.log('DB is connected');
}).catch((err) => {
  console.log(err);
});
