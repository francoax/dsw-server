import mongoose from "mongoose";

export default [
  {
    _id: mongoose.Types.ObjectId("65270324a6ecc0ccbf909cb5"),
    name: "John",
    lastname: "Doe",
    address: "Fake Street 123",
    email: "JhonDoe@Gmail.com",
    password: "12345678",
    tel: "12345678",
    role: "admin",
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    _id: mongoose.Types.ObjectId("65270324a6ecc0ccbf909c8u"),
    name: "Tomás",
    lastname: "Bottoni",
    address: "Zeit Street 123",
    email: "Bottoni@Gmail.com",
    password: "12345678",
    tel: "12345678",
    role: "user",
    createdAt: Date.now(),
    updatedAt: Date.now()
  },{
    _id: mongoose.Types.ObjectId("65270324a6ecc0ccbf909cp0"),
    name: "Juan",
    lastname: "Perez",
    address: "Super Street 123",
    email: "Perez@Gmail.com",
    password: "12345678",
    tel: "12345678",
    role: "admin",
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
]