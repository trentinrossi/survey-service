const express = require('express');
const router = express.Router();
const SurveyController = require('../controller/surveyController');

router.get('/', SurveyController.getAll);
router.get('/:id', SurveyController.getById);
router.post('/', SurveyController.insert);
router.patch('/:id', SurveyController.update);
router.delete('/:id', SurveyController.remove);

module.exports = router;
