const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    name: {
      type: String,
      required: [true, 'An nft must have a name']
    },
    fileUrl: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;
