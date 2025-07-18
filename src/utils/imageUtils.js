function convertImagesToBase64(doc) {
  const asset = doc._doc || doc; // Support both raw JSON and Mongoose Document

  if (!asset.images || !Array.isArray(asset.images)) return asset;

  return {
    ...asset,
    images: asset.images.map((img) => {
      if (Buffer.isBuffer(img)) {
        return img.toString('base64');
      }

      if (img?.type === 'Buffer' && Array.isArray(img.data)) {
        return Buffer.from(img.data).toString('base64');
      }

      return img;
    })
  };
}

module.exports = { convertImagesToBase64 };
