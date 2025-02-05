import cloudinary from '../../../lib/cloudinary'; // Adjust the import path if necessary
import Event from '../../../models/Event'; // Adjust the import path if necessary
import mongoose from 'mongoose';

// Connect to MongoDB
const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB');
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};

// POST Method for creating events
export async function POST(req) {
  const { title, description, date, venue, category, image } = await req.json();

  await connectToDB();

  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'event_image_preset'); // Replace with your upload preset

    const uploadResponse = await fetch(
      'https://api.cloudinary.com/v1_1/ddoearzyk/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await uploadResponse.json();
    const imageUrl = data.secure_url;

    const newEvent = new Event({
      title,
      description,
      date,
      venue,
      category,
      image: imageUrl,
    });

    await newEvent.save();

    return new Response(
      JSON.stringify({
        message: 'Event created successfully!',
        event: newEvent,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error creating event or uploading image' }),
      { status: 500 }
    );
  }
}

// GET Method for fetching events
export async function GET(req) {
  await connectToDB();

  try {
    const events = await Event.find();
    return new Response(JSON.stringify({ events }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching events' }), {
      status: 500,
    });
  }
}

// DELETE Method for deleting an event by ID
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('id'); // Get the event ID from the query string

  if (!eventId) {
    return new Response(JSON.stringify({ error: 'Event ID is required' }), {
      status: 400,
    });
  }

  await connectToDB();

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId); // Delete the event by ID

    if (!deletedEvent) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: 'Event deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting event' }), {
      status: 500,
    });
  }
}
