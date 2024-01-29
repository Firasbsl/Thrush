const express = require('express');
const instrumentController = require('./../controllers/instrumentsController');

const router = express.Router();

router
  .route('/')
  .get(instrumentController.getAllinstruments)
  .post(instrumentController.addinstrument);

router
  .route('/:id')
  .get(instrumentController.getinstrument)
  .put(instrumentController.updateinstrument)
  .delete(instrumentController.deleteinstrument);

module.exports = router;
