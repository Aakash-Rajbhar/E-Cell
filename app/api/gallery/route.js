import cloudinary from '../../../lib/cloudinary'; // Import Cloudinary config
import Gallery from '../../../models/GalleryItems'; // Model for the gallery collection
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

// POST Method to add gallery items
export async function POST(req) {
  const formData = await req.formData(); // Use formData() to handle file uploads
  const file = formData.get('file'); // Extract the file
  const description = formData.get('description'); // Extract the description
  const size = formData.get('size') || 'small'; // Extract the size

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
    });
  }

  if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
    return new Response(
      JSON.stringify({
        error: 'Invalid file type. Only images and videos are allowed.',
      }),
      { status: 400 }
    );
  }

  await connectToDB();

  try {
    // Upload file to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', 'gallery_upload_preset'); // Cloudinary upload preset

    const uploadResponse = await fetch(
      'https://api.cloudinary.com/v1_1/ddoearzyk/upload',
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    const data = await uploadResponse.json();
    console.log('Cloudinary Upload Response:', data); // Log Cloudinary response for debugging

    if (!uploadResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Cloudinary upload failed: ${data.message}` }),
        { status: 500 }
      );
    }

    const uploadedUrl = data.secure_url; // Get the secure URL from Cloudinary response

    // Save gallery item to MongoDB
    const newGalleryItem = new Gallery({
      url: uploadedUrl,
      type: file.type.startsWith('image') ? 'image' : 'video',
      description: description || '', // Optional description
      size: size || 'small', // Default size is 'small'
    });

    await newGalleryItem.save(); // Save to MongoDB

    return new Response(
      JSON.stringify({
        message: 'Gallery item added successfully',
        item: newGalleryItem,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return new Response(
      JSON.stringify({
        error: `Error uploading gallery item: ${error.message}`,
      }),
      { status: 500 }
    );
  }
}

// GET Method to fetch gallery items
export async function GET(req) {
  await connectToDB();

  try {
    const galleryItems = await Gallery.find(); // Fetch all gallery items
    return new Response(JSON.stringify(galleryItems), { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return new Response(
      JSON.stringify({ error: 'Error fetching gallery items' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url); // Extract the query params from the request URL
  const id = searchParams.get('id');

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid ID' }),
      {
        status: 400,
      }
    );
  }

  await connectToDB();

  try {
    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return new Response(
        JSON.stringify({ success: false, error: 'Gallery item not found' }),
        { status: 404 }
      );
    }

    await galleryItem.deleteOne();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Error deleting gallery item' }),
      { status: 500 }
    );
  }
}
