/* eslint-disable import/extensions */
import MedicalAsistance from '../models/MedicalAssistance.js';

const getAll = async (req, res) => {
  try {
    const mediA = await MedicalAsistance.find();
    res.status(200).json({
      message: 'Asistencias medicas encontradas',
      data: mediA,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error al buscar asistencias medicas',
      error: true,
      data: null,
    });
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
      message: 'Asistencia medica creada',
      data: newMedicalA,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error al crear asistencia medica',
      error: true,
      data: null,
    });
  }
};

const editData = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalAUpdated = await MedicalAsistance.updateOne({ _id: id }, { ...req.body });
    res.status(201).json({
      message: 'Asistencia medica actualizada',
      data: medicalAUpdated,

    });
  } catch (e) {
    res.status(500).json({
      message: 'Error al actualizar asistencia medica',
      error: true,
      data: null,
    });
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await MedicalAsistance.deleteOne({ _id: id });
    res.status(200).json({
      message: 'Asistencia medica eliminada',
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error al eliminar asistencia medica',
      error: true,
      data: null,
    });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalA = await MedicalAsistance.findOne({ _id: id });
    res.status(200).json({
      message: 'Asistencia medica encontrada',
      data: medicalA,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Error al encontrar asistencia medica',
      error: true,
      data: null,
    });
  }
};
export default {
  getOne, getAll, create, editData, deleteData,
};
