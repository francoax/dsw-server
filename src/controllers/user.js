/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const get = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: `Usuario con el id ${userId} no encontrado`,
        data: user,
        error: true,
      }).end();
    }

    res.status(200).json({
      message: 'Usuario encontrado',
      data: user,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: 'Error al buscar usuario',
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
        throw new Error('No existen usuarios con este filtro');
      }
      return res.status(200).json({
        message: 'Usuarios filtrados',
        data: users,
        error: false,
      });
    }

    if (users.length === 0) {
      return res.status(404).json({
        message: 'No hay usuarios',
        data: [],
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Lista de usuarios',
      data: users,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Error al buscar usuarios',
      error: true,
    });
  }
};

const create = async (req, res) => {
  const {
    name, lastname, address, email, tel, role,
  } = req.body;
  let { password } = req.body;

  try {
    const userExisting = await User.findOne({ email });

    if (userExisting) {
      return res.status(400).json({
        message: 'El email ya esta en uso',
        data: undefined,
        error: true,
      });
    }

    password = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, lastname, address, email, password, tel, role,
    });

    return res.status(201).json({
      message: 'Usuario creado',
      data: newUser,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Error al crear usuario',
      error: true,
    });
  }
};

const edit = async (req, res) => {
  const { userId } = req.user ?? {};
  const { id } = req.params;
  const {
    name, lastname, address, email, tel, role,
  } = req.body;
  let { password } = req.body;
  try {
    if (password) { password = await bcrypt.hash(password, 10); }

    const userUpdated = await User.findByIdAndUpdate(
      userId ?? id,
      {
        name,
        lastname,
        address,
        email,
        password,
        tel,
        role,
      },
      {
        new: true,
      },
    );

    if (!userUpdated) {
      res.status(404).json({
        message: 'No existe un usuario con ese ID',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Usuario editado',
      data: userUpdated,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error al editar usuario',
      error: true,
    }).end();
  }
};

const remove = async (req, res) => {
  const { userId } = req.user;

  try {
    const userDeleted = await User.findByIdAndRemove(userId);

    if (!userDeleted) {
      res.status(404).json({
        message: 'No existe usuario con ese ID',
        data: undefined,
        error: true,
      }).end();
    }

    res.status(200).json({
      message: 'Usuario eliminado',
      data: userDeleted,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: 'Error al eliminar usuario',
      error: true,
    }).end();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      message: 'Email y/o contraseña inválidos',
      error: true,

    });
  } else {
    const userForToken = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).json({
      message: 'Usuario logueado',
      data: {
        name: user.name,
        role: user.role,
        token,
      },
      error: false,
    });
  }
};

export default {
  get, getAll, create, edit, remove, login,
};
