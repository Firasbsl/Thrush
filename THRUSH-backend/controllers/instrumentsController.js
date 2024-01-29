const express = require('express');
const instrument = require('./../models/instrumentModel');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

exports.addinstrument = async (req, res) => {
  try {
    const newInstrument = await instrument.create(req.body);
    res.status(200).json(newInstrument);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getAllinstruments = async (req, res) => {
  try {
    const instruments = await instrument.find();
    res.json(instruments);
  } catch (e) {
    console.log(e);
  }
};

exports.getinstrument = async (req, res) => {
  try {
    const instrumentdata = await instrument.findById(req.params.id);
    res.status(200).json(instrumentdata);
  } catch (e) {
    console.log(e);
  }
};

exports.updateinstrument = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, price } = req.body;
  try {
    const instrumentdata = await instrument.findByIdAndUpdate(id, {
      name,
      description,
      stock,
      price
    });
    res.json(instrumentdata);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
};

exports.deleteinstrument = async (req, res) => {
  try {
    await instrument.findByIdAndDelete(req.params.id);
    res.status(200).json('deleted');
  } catch (e) {
    res.status(500).json();
    console.log(e);
  }
};

/*
const Instrument = require('./../models/instrumentModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllInstruments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Instrument.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const instruments = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: instruments.length,
    data: {
      instruments
    }
  });
});

exports.getInstrument = catchAsync(async (req, res, next) => {
  const instrument = await Instrument.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  if (!instrument) {
    return next(new AppError('No instrument found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      instrument
    }
  });
});

exports.createInstrument = catchAsync(async (req, res, next) => {
  const newInstrument = await Instrument.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      instrument: newInstrument
    }
  });
});

exports.updateInstrument = catchAsync(async (req, res, next) => {
  const instrument = await Instrument.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!instrument) {
    return next(new AppError('No instrument found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      instrument
    }
  });
});

exports.deleteInstrument = catchAsync(async (req, res, next) => {
  const instrument = await Instrument.findByIdAndDelete(req.params.id);

  if (!instrument) {
    return next(new AppError('No instrument found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
*/
