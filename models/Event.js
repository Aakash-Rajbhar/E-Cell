import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // This will store the Cloudinary image URL
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
