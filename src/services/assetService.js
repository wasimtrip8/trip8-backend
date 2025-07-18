const assetStorage = require('../storage/assetStorage');
const {convertImagesToBase64} = require('../utils/imageUtils');

const assetService = {
  createAsset: async (data) => {
    return await assetStorage.create(data);
  },
  updateAsset: async (id, data) => {
    return await assetStorage.update(id, data);
  },
  getAssets: async (filters) => {
    const assets = await assetStorage.find(filters);
      return assets.map(convertImagesToBase64);
  },
  getAssetById: async (id) => {
    const asset = await assetStorage.findById(id);
    if (!asset) return null;
    return convertImagesToBase64(asset);
  }
};

module.exports = assetService;