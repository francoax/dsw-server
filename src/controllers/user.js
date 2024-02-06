/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { sendPasswordRecoveryMail } from './mail.js';

const get = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: `Usuario con el id ${userId} no encontrado`,
        data: user,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Usuario encontrado',
      data: user,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al buscar usuario',
      error: true,
    });
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
    const updateFields = {
      name,
      lastname,
      address,
      email,
      tel,
      role,
    };

    if (password) {
      password = await bcrypt.hash(password, 10);
      updateFields.password = password;
    }

    const userUpdated = await User.findByIdAndUpdate(
      userId ?? id,
      updateFields,
      {
        new: true,
      },
    );

    if (!userUpdated) {
      return res.status(404).json({
        message: 'No existe un usuario con ese ID',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Usuario editado',
      data: userUpdated,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al editar usuario',
      data: error,
      error: true,
    });
  }
};

const remove = async (req, res) => {
  const { userId } = req.user ?? {};
  const { id } = req.params;

  try {
    const userDeleted = await User.findByIdAndRemove(userId ?? id);

    if (!userDeleted) {
      return res.status(404).json({
        message: 'No existe usuario con ese ID',
        data: undefined,
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Usuario eliminado',
      data: userDeleted,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al eliminar usuario',
      error: true,
    });
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
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).json({
      message: 'Usuario logueado',
      data: { token },
      error: false,
    });
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const host = req.get('host');
  const { protocol } = req;

  try {
    const sended = await sendPasswordRecoveryMail(email, { protocol, host });

    if (!sended) {
      return res.status(404).json({
        message: 'No se encontro un usuario con ese mail.',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Email enviado. Recibe su correo. Si no aparece, revise tambien su carpeta de spam',
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error al intentar enviar el mail',
      error: true,
    });
  }
};

const redirectForRecoverPassword = (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.SECRET_RP, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Enlace inválido o expirado' });
    }

    return res.redirect(`http://localhost:4200/password-reset/${token}`);
  });
};

const setNewPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        password: await bcrypt.hash(password, 10),
      },
      { new: true },
    ).select('email');

    if (!userUpdated) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
        data: userUpdated,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Contraseña reestablecida con exito para ${userUpdated.email}`,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrio un error al reestablecer la contraseña',
      error: true,
    });
  }
};

export default {
  get, getAll, create, edit, remove, login, recoverPassword, redirectForRecoverPassword, setNewPassword,
};
