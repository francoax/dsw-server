import { Router } from 'express';
import propertieTypeABM from '../controllers/propertieTypeController.js'


const router = Router();

// Imports for each route below
router.get('/propertieType', propertieTypeABM.getAll);

router.get('/propertieType/:id', propertieTypeABM.getOne);

router.post('/propertieType/add', propertieTypeABM.add);

router.put('/propertieType/edit/:id', propertieTypeABM.update);

router.delete('/propertieType/:id', propertieTypeABM.delete);

router.use((error, req, res, next)=>{
  console.error(error);

  if(error.name === 'CastError'){
    res.status(400).send({
      error:'category used is malformed'
    }).end();
  }else{
    res.status(500).end();
  }
});

export default router;
