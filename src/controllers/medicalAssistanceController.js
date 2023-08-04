import mongoose from 'mongoose';
import MedicalAsistance from '../models/MedicalAssistance.js';
const getAll = async (req,res) =>{
  try{
    const mediA = await MedicalAsistance.find();
    res.status(200).json({
      message: 'Data sent successfully',
      data:mediA
    });
  } catch(e){
    console.log(e.message);
  }
};

const create = async (req,res)=>{
  try{
    const newMedicalA = await MedicalAsistance.create({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      coverageType: req.body.coverageType,
    });
    res.status(200).json({
      message:'Data added succesfully',
      data:newMedicalA
    });
  } catch(e){
    console.log(e.message)
  }  
}

const editData = async (req,res)=>{
  try{
    const medicalAUpdated = await MedicalAsistance.updateOne({_id:req.body._id},{...req.body});
    res.status(201).json({
      message:'Data updated succesfuly',
      data: medicalAUpdated

    })
    
  }catch(e){
    console.log(e.message);
  }

}

const deleteData = async (req,res) => {
  try{
    await MedicalAsistance.deleteOne({_id:req.body._id});
    res.status(200).json({
      message: 'Data deleated succesfuly'
    })

  }catch(e){
    console.log(e.message);
  }
}

const getOne = async(req,res) =>{
  const id = req.params.id;
  try{
    const medicalA = await MedicalAsistance.findOne({_id:id});
    res.status(200).json({
      message: 'Data sent successfully',
      data: medicalA
    });
  } catch(e){
    console.log(e.message);
  }


}
export default {getOne,getAll,create,editData,deleteData};