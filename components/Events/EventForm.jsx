import { set } from 'mongoose';
import { useState } from 'react';

const EventForm = () => {
  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    category: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', eventData.image);
    formData.append('upload_preset', 'event_image_preset'); // Use your upload preset name

    try {
      setLoading(true);
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/ddoearzyk/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();

      // Check if the upload was successful
      if (data.secure_url) {
        const imageUrl = data.secure_url;

        // Send event data with image URL to your API
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...eventData, image: imageUrl }),
        });

        if (response.ok) {
          alert('Event added successfully!');
          setEventData({
            title: '',
            description: '',
            date: '',
            venue: '',
            category: '',
            image: null,
          });
        } else {
          alert('Failed to add event.');
        }
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image or saving event:', error);
      alert('An error occurred while uploading the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Event Title</label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          placeholder="Enter event title"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Event Description</label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          placeholder="Enter event description"
          className="w-full p-2 border border-gray-300 rounded-lg h-32"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700">Event Date</label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Event Venue</label>
        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleInputChange}
          placeholder="Enter event venue"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Event Category</label>
        <select
          name="category"
          value={eventData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select event category</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Previous">Previous</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Event Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-black p-2 rounded-lg mt-4"
      >
        {loading ? 'Adding Event...' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;
