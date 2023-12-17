/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import Reserve from '../models/reserve.js';
import getUserById from '../services/users.service.js';
import { sendReserveConfirmation } from './mail.js';

const getAll = async (req, res) => {
  res.status(200).json({
    message: 'Lista de reservas',
    data: await Reserve.find().populate([
      { path: 'user' },
      { path: 'packageReserved', populate: 'property' },
    ]),
    error: false,
  });
};

const get = async (req, res) => {
  const { id } = req.params;
  const reserve = await Reserve.findById(id);
  if (!reserve) {
    res.stauts(404).json({
      message: `Reserva con el id: ${id} no encontrada`,
      data: reserve,
      error: true,
    }).end();
  }
  res.status(200).json({
    message: 'Reserva encontrada',
    data: reserve,
    error: false,
  }).end();
};

const getByUser = async (req, res) => {
  const { userId } = req.user;
  try {
    const reserves = await Reserve.find({ user: userId });
    res.status(200).json({
      message: 'Reserva encontrada',
      data: reserves,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: 'Error al buscar reserva por usuario',
      error: true,
    }).end();
  }
};

const post = async (req, res) => {
  const { userId } = req.user;
  const {
    date_start, date_end, packageReserved,
  } = req.body;

  try {
    const newReserve = await Reserve.create({
      date_start, date_end, user: userId, packageReserved,
    });

    const user = await getUserById(userId);

    sendReserveConfirmation(user, newReserve);

    res.status(201).json({
      message: 'Reserva creada',
      data: newReserve,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: 'Error al crear reserva',
      error: true,
    }).end();
  }
};

const put = async (req, res) => {
  const { id } = req.params;
  const {
    date_start, date_end, packageReserved,
  } = req.body;
  const { userId } = req.user;
  try {
    if (!userId) {
      res.status(403).json({
        message: 'No autorizado',
        data: undefined,
        error: true,
      }).end();
    }
    const user = userId;
    const reserveUpdated = await Reserve.findByIdAndUpdate(id, {
      date_start, date_end, user, packageReserved,
    }, { new: true });
    if (!reserveUpdated) {
      res.stauts(404).json({
        message: `Reserva con el id: ${id} no encontrada`,
        data: reserveUpdated,
        error: true,
      }).end();
    }

    res.status(200).json({
      message: 'Reserva actualizada',
      data: reserveUpdated,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: 'Error al editar reserva',
      error: true,
    }).end();
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    if (!userId) {
      res.status(403).json({
        message: 'No autorizado',
        data: undefined,
        error: true,
      }).end();
    }
    const reserveRemoved = await Reserve.findByIdAndRemove(id);
    if (!reserveRemoved) {
      res.stauts(404).json({
        message: `Reserva con el Id: ${id} no encontrada`,
        data: reserveRemoved,
        error: true,
      }).end();
    }
    res.status(200).json({
      message: 'Reserva eliminada',
      data: reserveRemoved,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: 'Error al eliminar reserva',
      error: true,
    }).end();
  }
};

export default {
  getAll,
  get,
  getByUser,
  post,
  put,
  remove,
};
