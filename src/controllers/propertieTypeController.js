import propertieType from '../models/propertieType.js';

const propertieTypeABM = {};

propertieTypeABM.getAll = (req, res)=>{
  propertieType.find().then(propertieType =>{
    res.json(propertieType);
  });
}

propertieTypeABM.getOne = (req, res, next)=>{
  const { id }  = req.params;

  propertieType.findById(id).then(propertie =>{
    if(propertie){
      return res.json(propertie);
    }else{
      res.status(404).end();
    }
  }).catch(err =>{
    next(err)
  });
}

propertieTypeABM.add = (req, res)=>{
  const propertie = req.body;
  
  if(!propertie.description){
    return res.status(400).json({
      error:'required "description" field is missing'
    })
  }

  const newpropertieType = new propertieType(propertie);
  newpropertieType.save().then(newpropertieType =>{
    res.json(newpropertieType);
  });
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