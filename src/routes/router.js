const express = require('express');
const router = express.Router();
const AuthRouter = require('./authRouter'); 
const AssetRouter = require('./assetRouter'); 

router.use('/auth', AuthRouter);
router.use('/assets', AssetRouter);

module.exports = router;
