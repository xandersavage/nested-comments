import { User } from '../models/userModel.js';

// A simple function to get a fake user for testing purposes
// This would usually come from authentication middleware

export const getDummyUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: 'testuser@example.com' });

    if (!user) {
      user = await User.create({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword123',
        role: 'user',
      });
      console.log('Fake user created: ', user.username);
    }
    // Attach user to request for subsequent middleware/controllers
    req.user = user;
    next(); // Move to the next middleware/controller
  } catch (error) {
    console.error('Error getting fake user:', error);
    res.status(500).json({
      message: 'internal server error',
      error: error.message,
    });
  }
};
