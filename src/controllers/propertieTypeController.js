import propertieType from '../models/propertieType.js';

const propertieTypeABM = {};

propertieTypeABM.getAll = (req, res)=>{
  try{
    propertieType.find().then(propertieTypes =>{
      if (propertieTypes.length === 0) {
        throw new Error('There are not propertie types');
      }
      res.status(200).json({
        message: 'Propertie types list.',
        data: propertieTypes,
        error: false,
      });
    });
  }catch (err) {
    return res.status(400).json({
      message: err.message,
      error: true,
    });
  }

  
};

propertieTypeABM.getOne = (req, res, next)=>{
  const { id }  = req.params;

  propertieType.findById(id).then(propertie =>{
    if(propertie){
      res.status(200).json({
        message: 'Propertie type found.',
        data: propertie,
        error: false,
      }).end();
      return res.json(propertie);
    }else{
      res.stauts(404).json({
        message: `Propertie type with the Id ${id} not found.`,
        data: propertie,
        error: true,
      }).end();
    }
  }).catch(error =>{
    res.status(400).json({
      message: error.message,
      error: true,
    }).end();
  });
}

propertieTypeABM.add = (req, res)=>{
  const { description } = req.body;
  const propertieType = req.body;

  try{
    if(propertieType.description === ""){
      console.log('entré');
      return res.status(400).json({
        message: 'required "description" field is missing.',
        data: undefined,
        error: true,
      })
    }
    propertieType.findOne({ description }).then(propertie=>{
      if (propertie) {
        return res.status(400).json({
          message: 'The propertie type already exists.',
          data: undefined,
          error: true,
        });
      }else{
        const newpropertieType = new propertieType(propertieType);
        newpropertieType.save().then(newpropertieType =>{
        res.status(201).json({
          message: 'propertie type created.',
          data: newpropertieType,
          error: true,
        });
      });
      }
    });
    
    
    
  }catch (err) {
    return res.status(400).json({
      message: err.message,
      err,
      error: true,
    });
  }
}

propertieTypeABM.update = (req, res)=>{
  const {id} = req.params;
  const data = req.body;

  const newPropertyType = {
    description: data.description
  }

  propertieType.findByIdAndUpdate(id, newPropertyType, {new:true})
  .then(result =>{
    res.json(result);
  })
}

propertieTypeABM.delete = (req, res)=>{
  const {id} = req.params;
  propertieType.findByIdAndRemove(id).then(result=>{
    res.status(204).end();
  }).catch(err=>{
    next(err);
  })
  
  
}

export default propertieTypeABM;