const User = require('../models/user');
const { sendError } = require('../utils/helper');

// Controller to create a new user
exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, 'This email is already in use!');

  const newUser = new User({ name, email, password });
  await newUser.save();

  return res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};
