const Asset = require('../models/assetModel');

const assetStorage = {
  create: async (data) => {
    return await Asset.create(data);
  },
  update: async (id, data) => {
    return await Asset.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },
  find: async (filters) => {
    const query = {};
    if (filters.type) query.type = filters.type;
    if (filters.subType) query.subType = filters.subType;
    if (filters.carType) query.carType = filters.carType;
    if (filters.tags) query.tags = { $in: Array.isArray(filters.tags) ? filters.tags : [filters.tags] };
    return await Asset.find(query);
  },
    findById: async (id) => {
        return await Asset.findById(id);
    }
};

module.exports = assetStorage;