/* eslint-disable import/extensions */
import MedicalAsistance from '../models/MedicalAssistance.js';

const getAll = async (req, res) => {
  try {
    const mediA = await MedicalAsistance.find();
    res.status(200).json({
      message: 'Información obtenida con exito',
      data: mediA,
    });
  } catch (e) {
    res.status(404).json({
      message: "Hubo un error con la solicitud, intente nuevamente",
      error: true,
    }).end();
  }
};

const create = async (req, res) => {
  try {
    const newMedicalA = await MedicalAsistance.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      coverageType: req.body.coverageType,
    });
    res.status(200).json({
      message: 'Asistencia médica guardada con exito',
      data: newMedicalA,
    });
  } catch (e) {
    res.status(404).json({
      message: "Hubo un error con la solicitud, intente nuevamente",
      error: true,
    }).end();
  }
};

const editData = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalAUpdated = await MedicalAsistance.updateOne({ _id: id }, { ...req.body });
    res.status(201).json({
      message: 'Asistencia médica actualizada con exito',
      data: medicalAUpdated,

    });
  } catch (e) {
    res.status(404).json({
      message: "Hubo un error con la solicitud, intente nuevamente",
      error: true,
    }).end();
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await MedicalAsistance.deleteOne({ _id: id });
    res.status(200).json({
      message: 'Asistencia médica eliminada con exito',
    });
  } catch (e) {
    res.status(404).json({
      message: "Hubo un error con la solicitud, intente nuevamente",
      error: true,
    }).end();
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalA = await MedicalAsistance.findOne({ _id: id });
    res.status(200).json({
      message: 'Asistencia médica obtenida con exito',
      data: medicalA,
    });
  } catch (e) {
    res.status(404).json({
      message: "Hubo un error con la solicitud, intente nuevamente",
      error: true,
    }).end();
  }
};
export default {
  getOne, getAll, create, editData, deleteData,
};
