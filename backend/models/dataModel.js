// models/dataModel.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  sno: Number,
  customerName: String,
  age: Number,
  phone: String,
  location: String,
  created_at: { type: Date, default: Date.now },
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
