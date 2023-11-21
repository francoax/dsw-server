import propertyType from '../models/propertieType.js';

const propertieTypeABM = {};

propertieTypeABM.getAll = (req, res) => {
  propertyType.find().then((propertieTypes) => {
    if (propertieTypes.length === 0) {
      throw new Error('There are not propertie types');
    }
    res.status(200).json({
      message: 'Propertie types list.',
      data: propertieTypes,
      error: false,
    });
  })
    .catch((e) => res.status(400).json({
      message: e.message,
      error: true,
    }));
};

propertieTypeABM.getOne = (req, res, next) => {
  const { id } = req.params;

  propertyType.findById(id).then((propertie) => {
    if (propertie) {
      res.status(200).json({
        message: 'Propertie type found.',
        data: propertie,
        error: false,
      }).end();
      return res.json(propertie);
    }
    res.status(404).json({
      message: `Propertie type with the Id ${id} not found.`,
      data: propertie,
      error: true,
    }).end();
  }).catch((error) => {
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  });
};

propertieTypeABM.add = (req, res) => {
  const { description } = req.body;
  const propertieTypeNew = req.body;

  try {
    if (propertieTypeNew.description === '') {
      console.log('entré');
      return res.status(400).json({
        message: 'required "description" field is missing.',
        data: undefined,
        error: true,
      });
    }
    propertyType.findOne({ description }).then((propertie) => {
      if (propertie) {
        return res.status(400).json({
          message: 'The propertie type already exists.',
          data: undefined,
          error: true,
        });
      }
      const newpropertieType = new propertyType(propertieTypeNew);
      newpropertieType.save().then((newpropertieType) => {
        res.status(201).json({
          message: 'propertie type created.',
          data: newpropertieType,
          error: false,
        });
      });
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      err,
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
      .then((result) => {
        res.json({
          message: 'propertie type updated.',
          data: newPropertyType,
          error: false,
        });
      });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      err,
      error: true,
    });
  }
};

propertieTypeABM.delete = (req, res) => {
  const { id } = req.params;
  propertyType.findByIdAndRemove(id).then((result) => {
    res.status(204).json({
      message: 'propertie type deleted.',
      data: result,
      error: false,
    });
  }).catch((err) => {
    res.status(400).json({
      message: err.message,
      err,
      error: true,
    });
  });
};

export default propertieTypeABM;
