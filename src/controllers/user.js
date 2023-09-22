/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const get = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: `User with the id ${id} not found`,
        data: user,
        error: true,
      }).end();
    }

    res.status(404).json({
      message: 'User found.',
      data: user,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  }
};

const getAll = async (req, res) => {
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

const edit = async (req, res) => {
  const { id } = req.params;
  const {
    name, lastname, address, email, password, tel,
  } = req.body;

  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        address,
        email,
        password,
        tel,
      },
      {
        new: true,
      },
    );

    if (!userUpdated) {
      res.status(404).json({
        message: 'There is not a user with that id.',
        data: undefined,
        error: true,
      }).end();
    }
    res.status(200).json({
      message: 'User updated',
      data: userUpdated,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const userDeleted = await User.findByIdAndRemove(id);

    if (!userDeleted) {
      res.status(404).json({
        message: 'There is not a user with that id.',
        data: undefined,
        error: true,
      }).end();
    }

    res.status(200).json({
      message: 'User deleted.',
      data: userDeleted,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCorrect = user === null
    ? false
    : password === user.password;

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      message: 'Invalid user or password',
      error: true,

    });
  }

  const userForToken = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).json({
    message: 'User logged in',
    data: token,
    error: false,
  });
};

export default {
  get, getAll, create, edit, remove, login,
};
