const { body, query, param } = require('express-validator');

const assetTypes = ['accommodation', 'transportation', 'food', 'miscellaneous'];

const subTypeMap = {
  food: ['breakfast', 'lunch', 'dinner', 'snacks', 'drinks'],
  accommodation: ['hotel', 'hostel', 'apartment', 'villa', 'guesthouse'],
  transportation: ['flight', 'train', 'bus', 'car', 'bike', 'boat'],
  miscellaneous: ['activity', 'shopping', 'sightseeing', 'other'],
};

const carTypes = ['sedan', 'suv', 'hatchback', 'convertible', 'van', 'truck', 'luxury', 'economy'];

const createAssetValidator = [
  body('details').notEmpty().withMessage('Details are required'),
  body('type')
    .isIn(assetTypes)
    .withMessage(`Type must be one of: ${assetTypes.join(', ')}`),
  body('subType').custom((value, { req }) => {
    const { type } = req.body;
    const validSubTypes = subTypeMap[type];
    if (!validSubTypes) {
      throw new Error(`No valid subTypes for type '${type}'`);
    }
    if (!validSubTypes.includes(value)) {
      throw new Error(`Invalid subType '${value}' for type '${type}'`);
    }
    return true;
  }),
  body('carType').custom((value, { req }) => {
    const { type, subType } = req.body;
    if (type === 'transportation' && subType === 'car') {
      if (!value) {
        throw new Error(`carType is required for transportation/car`);
      }
      if (!carTypes.includes(value)) {
        throw new Error(`Invalid carType '${value}'`);
      }
    }
    return true;
  }),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
  body('images').optional().isArray().withMessage('Images must be an array'),
];

const updateAssetValidator = [
  body('details').optional().isString().withMessage('Details must be a string'),
  body('type')
    .optional()
    .isIn(assetTypes)
    .withMessage(`Type must be one of: ${assetTypes.join(', ')}`),
  body('subType').optional().custom((value, { req }) => {
    const type = req.body.type; // Can be undefined
    if (!type) return true; // Cannot validate subType without knowing type
    const validSubTypes = subTypeMap[type];
    if (!validSubTypes) return true;
    if (!validSubTypes.includes(value)) {
      throw new Error(`Invalid subType '${value}' for type '${type}'`);
    }
    return true;
  }),
  body('carType').optional().custom((value, { req }) => {
    const { type, subType } = req.body;
    if (type === 'transportation' && subType === 'car') {
      if (!value) {
        throw new Error(`carType is required for transportation/car`);
      }
      if (!carTypes.includes(value)) {
        throw new Error(`Invalid carType '${value}'`);
      }
    }
    return true;
  }),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
  body('images').optional().isArray().withMessage('Images must be an array'),
];

const getAssetsValidator = [
  query('type').optional().isIn(assetTypes).withMessage(`Invalid asset type`),
  query('subType').optional().isString(),
  query('tags').optional().isString(), // assuming comma-separated, handle parsing in service
];

const getAssetByIdValidator = [
  param('id').notEmpty().isMongoId().withMessage(`Invalid asset ID`)
];

module.exports = {
  createAssetValidator,
  updateAssetValidator,
  getAssetsValidator,
  getAssetByIdValidator
};
