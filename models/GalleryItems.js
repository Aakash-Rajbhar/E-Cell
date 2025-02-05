// models/Gallery.js
import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  url: { type: String, required: true }, // URL of the image/video
  type: { type: String, required: true }, // 'image' or 'video'
  description: { type: String, default: '' }, // Optional description for the item
  size: {
    type: String,
    default: 'small',
    enum: ['large', 'small'],
  },
});

const Gallery =
  mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;
