const express = require('express');
const assetService = require('../services/assetService');
const { validationResult } = require('express-validator');
const {
  createAssetValidator,
  updateAssetValidator,
  getAssetsValidator,
  getAssetByIdValidator
} = require('../validators/assetValidator');

const router = express.Router();

// Create asset
router.post('/', createAssetValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    const asset = await assetService.createAsset(req.body);
    res.status(201).json({ message: "Asset created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update asset
router.put('/:id', updateAssetValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    const asset = await assetService.updateAsset(req.params.id, req.body);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get assets with filters
router.get('/', getAssetsValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    const assets = await assetService.getAssets(req.query);
    res.json(assets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', getAssetByIdValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    const asset = await assetService.getAssetById(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
