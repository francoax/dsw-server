/* eslint-disable import/extensions */
import User from '../models/user.js';

const get = async (req, res) => {
  const filter = req.query;

  try {
    const users = await User.find({ ...filter });

    if (Object.values(filter).length !== 0) {
      if (users.length === 0) {
        throw new Error('There are not users with that filter');
      }
      return res.status(200).json({
        message: 'Users filtered',
        data: users,
        error: false,
      });
    }

    if (users.length === 0) {
      return res.status(404).json({
        message: 'There are not users yet...',
        data: [],
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Users list',
      data: users,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      error: true,
    });
  }
};

const create = async (req, res) => {
  const {
    name, lastname, address, email, password, tel,
  } = req.body;

  try {
    const userExisting = await User.findOne({ email });

    if (userExisting) {
      return res.status(400).json({
        message: 'The email already exists.',
        data: undefined,
        error: true,
      });
    }

    const newUser = await User.create({
      name, lastname, address, email, password, tel,
    });

    return res.status(201).json({
      message: 'User created',
      data: newUser,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      err,
      error: true,
    });
  }
};

const edit = () => {};

const remove = () => {};

export default {
  get, create, edit, remove,
};
