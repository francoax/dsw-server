import User from '../models/user.js';

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    return error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.find({ email });

    return user;
  } catch (error) {
    return error;
  }
};

export default getUserById;
