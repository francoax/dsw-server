/* eslint-disable no-shadow */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import propertyType from '../models/propertieType.js';

const propertieTypeABM = {};

propertieTypeABM.getAll = (req, res) => {
  propertyType.find().then((propertieTypes) => {
    if (propertieTypes.length === 0) {
      throw new Error('Tipos de propiedad no encontrados');
    }
    res.status(200).json({
      message: 'Lista de tipos de propiedad',
      data: propertieTypes,
      error: false,
    });
  })
    .catch(() => res.status(400).json({
      message: 'Error al buscar tipos de propiedad',
      error: true,
    }));
};

propertieTypeABM.getOne = (req, res) => {
  const { id } = req.params;

  propertyType.findById(id).then((propertie) => {
    if (propertie) {
      res.status(200).json({
        message: 'Tipo de propiedad encontrado',
        data: propertie,
        error: false,
      }).end();
      return res.json(propertie);
    }
    res.status(404).json({
      message: `Tipo de propiedad con id: ${id} no encontrado.`,
      data: propertie,
      error: true,
    }).end();
  }).catch(() => {
    res.status(400).json({
      message: 'Error al buscar tipo de propiedad',
      error: true,
    }).end();
  });
};

propertieTypeABM.add = (req, res) => {
  const { description } = req.body;
  const propertieTypeNew = req.body;

  try {
    if (propertieTypeNew.description === '') {
      return res.status(400).json({
        message: 'Falta el campo requerido "descripcion"',
        data: undefined,
        error: true,
      });
    }
    propertyType.findOne({ description }).then((propertie) => {
      if (propertie) {
        return res.status(400).json({
          message: 'El tipo de propiedad ya existe',
          data: undefined,
          error: true,
        });
      }
      const newpropertieType = new propertyType(propertieTypeNew);
      newpropertieType.save().then((newpropertieType) => {
        res.status(201).json({
          message: 'Tipo de propiedad creado',
          data: newpropertieType,
          error: false,
        });
      });
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Error al crear tipo de propiedad',
      error: true,
    });
  }
};

propertieTypeABM.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const newPropertyType = {
    description: data.description,
  };
  try {
    propertyType.findByIdAndUpdate(id, newPropertyType, { new: true })
      .then(() => {
        res.json({
          message: 'Tipo de propiedad actualizado',
          data: newPropertyType,
          error: false,
        });
      });
  } catch (err) {
    return res.status(400).json({
      message: 'Error al editar tipo de propiedad',
      error: true,
    });
  }
};

propertieTypeABM.delete = (req, res) => {
  const { id } = req.params;
  propertyType.findByIdAndRemove(id).then((result) => {
    res.status(204).json({
      message: 'Tipo de propiedad eliminado',
      data: result,
      error: false,
    });
  }).catch(() => {
    res.status(400).json({
      message: 'Error al eliminar tipo de propiedad',
      error: true,
    });
  });
};

export default propertieTypeABM;
