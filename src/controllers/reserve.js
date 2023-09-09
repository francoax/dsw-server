/* eslint-disable camelcase */
// eslint-disable-next-line import/extensions
import Reserve from '../models/reserve.js';

const getAll = async (req, res) => {
  res.status(200).json({
    message: 'Reserves list',
    data: await Reserve.find().populate('user package'),
    error: false,
  });
};

const get = async (req, res) => {
  const { id } = req.params;
  const reserve = await Reserve.findById(id);
  if (!reserve) {
    res.stauts(404).json({
      message: `Reserve with the Id ${id} not found.`,
      data: reserve,
      error: true,
    }).end();
  }
  res.status(200).json({
    message: 'Reserve found.',
    data: reserve,
    error: false,
  }).end();
};

const post = async (req, res) => {
  const {
    date_start, date_end, user, packageReserved,
  } = req.body;

  try {
    const newReserve = await Reserve.create({
      date_start, date_end, user, packageReserved,
    });

    res.status(201).json({
      message: 'Reserve done.',
      data: newReserve,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  }
};

const put = async (req, res) => {
  const { id } = req.params;
  const {
    date_start, date_end, user, packageReserved,
  } = req.body;
  try {
    const reserveUpdated = await Reserve.findByIdAndUpdate(id, {
      date_start, date_end, user, packageReserved,
    }, { new: true });
    if (!reserveUpdated) {
      res.stauts(404).json({
        message: `Reserve with the Id ${id} not found.`,
        data: reserveUpdated,
        error: true,
      }).end();
    }

    res.status(200).json({
      message: 'Reserve updated',
      data: reserveUpdated,
      error: false,
    }).end();
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
    const reserveRemoved = await Reserve.findByIdAndRemove(id);
    if (!reserveRemoved) {
      res.stauts(404).json({
        message: `Reserve with the Id ${id} not found.`,
        data: reserveRemoved,
        error: true,
      }).end();
    }
    res.status(200).json({
      message: 'Reserve deleted.',
      data: reserveRemoved,
      error: false,
    }).end();
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  }
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
};