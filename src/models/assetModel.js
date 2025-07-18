const mongoose = require('mongoose');
const { Schema } = mongoose;

const assetTypes = ['accommodation', 'transportation', 'food', 'miscellaneous'];

const foodSubTypes = ['breakfast', 'lunch', 'dinner', 'snacks', 'drinks'];
const accommodationSubTypes = ['hotel', 'hostel', 'apartment', 'villa', 'guesthouse'];
const transportationSubTypes = ['flight', 'train', 'bus', 'car', 'bike', 'boat'];
const miscellaneousSubTypes = ['activity', 'shopping', 'sightseeing', 'other'];

const carTypes = ['sedan', 'suv', 'hatchback', 'convertible', 'van', 'truck', 'luxury', 'economy'];

const AssetSchema = new Schema({
  details: { type: String, required: true },
  type: { type: String, enum: assetTypes, required: true },
  subType: { type: String, required: true },
  carType: { type: String, enum: carTypes }, // Only for transportation/car
  tags: [{ type: String }],
  images: [{ type: Buffer }]
}, { timestamps: true });

// Custom validation for subType and carType based on type
AssetSchema.pre('validate', function(next) {
  const { type, subType, carType } = this;
  let validSubTypes = [];
  if (type === 'food') validSubTypes = foodSubTypes;
  else if (type === 'accommodation') validSubTypes = accommodationSubTypes;
  else if (type === 'transportation') validSubTypes = transportationSubTypes;
  else if (type === 'miscellaneous') validSubTypes = miscellaneousSubTypes;

  if (!validSubTypes.includes(subType)) {
    return next(new Error(`Invalid subType '${subType}' for type '${type}'`));
  }

  if (type === 'transportation' && subType === 'car' && carType && !carTypes.includes(carType)) {
    return next(new Error(`Invalid carType '${carType}' for transportation/car`));
  }

  next();
});

module.exports = mongoose.model('Asset', AssetSchema);