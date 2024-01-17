import User from '../models/user.js';

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    return error;
  }
};

export default getUserById;
