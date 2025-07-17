const express = require('express');
const AiController = require('../controllers/aiController');

const router = express.Router();
const aiController = new AiController();

router.post('/generate-response', aiController.getAIResponse);
router.post('/train', aiController.trainModel);

module.exports = router;