/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import Reserve from '../models/reserve.js';
import getPackageById from '../services/packages.service.js';
import getUserById from '../services/users.service.js';
import { sendReserveConfirmation } from './mail.js';

const getAll = async (req, res) => {
  try {
    const reserves = await Reserve.find().populate([
      { path: 'user' },
      { path: 'packageReserved', populate: 'property' },
    ]);

    if (!reserves) {
      return res.status(404).json({
        message: 'No se encontraron reservas',
        error: true,
      });
    }

    res.status(200).json({
      message: 'Lista de reservas',
      data: reserves,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error al buscar las reservas',
      error: true,
    });
  }
};
const get = async (req, res) => {
  const { id } = req.params;
  try {
    const reserve = await Reserve.findById(id);
    if (!reserve) {
      return res.status(404).json({
        message: `Reserva con el id: ${id} no encontrada`,
        data: reserve,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Reserva encontrada',
      data: reserve,
      error: false,
    }).end();
  } catch (e) {
    return res.status(400).json({
      message: 'error al buscar reserva',
      data: e,
      error: true,

    });
  }
};

const getByUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const reserves = await Reserve.find({ user: userId })
      .populate([
        { path: 'user' },
        {
          path: 'packageReserved',
          populate: [
            { path: 'property', populate: 'propertyType' },
            { path: 'car' }, { path: 'medicalAssistance' },
          ],
        },
      ]);
    return res.status(200).json({
      message: 'Reserva encontrada',
      data: reserves,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al buscar reserva por usuario',
      error: true,
    });
  }
};

const post = async (req, res) => {
  const { userId } = req.user;
  const {
    date_start, date_end, packageReserved, totalPrice,
  } = req.body;

  try {
    const newReserve = await Reserve.create({
      date_start, date_end, user: userId, packageReserved, totalPrice,
    });

    const user = await getUserById(userId);
    const packageR = await getPackageById(packageReserved);

    newReserve.user = user;
    newReserve.packageReserved = packageR;

    sendReserveConfirmation(newReserve);

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
    date_start, date_end, packageReserved, totalPrice,
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
      date_start, date_end, user, packageReserved, totalPrice,
    }, { new: true });
    if (!reserveUpdated) {
      res.status(404).json({
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
      return res.status(403).json({
        message: 'No autorizado',
        data: undefined,
        error: true,
      });
    }
    const reserveRemoved = await Reserve.findByIdAndRemove(id);
    if (!reserveRemoved) {
      return res.status(404).json({
        message: `Reserva con el Id: ${id} no encontrada`,
        data: reserveRemoved,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Reserva eliminada',
      data: reserveRemoved,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al eliminar reserva',
      error: true,
    });
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
