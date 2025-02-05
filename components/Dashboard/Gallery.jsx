import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]); // Gallery items state
  const [newItem, setNewItem] = useState(null); // Image or video file to add
  const [description, setDescription] = useState(''); // Description state
  const [size, setSize] = useState('small'); // Size of the gallery item
  const [isUploading, setIsUploading] = useState(false); // Upload state
  const [addGalleryItem, setAddGalleryItem] = useState(false); // Toggle to show add gallery form
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch the gallery items on page load
  useEffect(() => {
    const fetchGalleryItems = async () => {
      setIsLoading(true); // Start loading
      const response = await fetch('/api/gallery');
      const data = await response.json();
      console.log(data);

      setGalleryItems(data); // Set the gallery items
      setIsLoading(false); // Stop loading
    };

    fetchGalleryItems();
  }, []);

  // Handle file change (image or video)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem(file);
    }
  };

  // Handle adding new item to gallery
  const handleAddItem = async () => {
    if (!newItem) {
      alert('Please select an image or video to upload.');
      return;
    }

    setIsUploading(true);

    try {
      // Prepare the payload for the POST request
      const formData = new FormData();
      formData.append('file', newItem);
      formData.append('description', description);
      formData.append('size', size);

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        // Re-fetch the gallery items to update the gallery with the new item
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryItems(data.galleryItems || []); // Set the updated gallery items
        setNewItem(null); // Clear file input
        setDescription(''); // Clear description
        setSize('small'); // Reset size
      } else {
        console.error('Failed to add gallery item:', result);
        alert('Failed to add gallery item.');
      }
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('Failed to upload item.');
    } finally {
      setIsUploading(false);
      setAddGalleryItem(false); // Close the add item form
    }
  };

  // Handle deleting a gallery item
  const handleDeleteItem = async (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        setGalleryItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        alert('Gallery item deleted successfully.');
      } else {
        console.error('Failed to delete gallery item:', data.error);
        alert(data.error || 'Failed to delete gallery item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete gallery item.');
    }
  };

  return (
    <div className="p-2 md:p-4 lg:p-8">
      <p className="mb-6">Manage the gallery of images, videos, and more.</p>

      {/* "Add New Item" Button */}
      <div className="mb-6 flex justify-end">
        <button onClick={() => setAddGalleryItem(!addGalleryItem)}>
          {addGalleryItem ? (
            <div className="bg-red-500 py-2 px-3 rounded-lg text-white">
              <X className="h-5 w-5 inline-block mr-2" />
              Cancel
            </div>
          ) : (
            <div className="bg-green-500 py-2 px-3 rounded-lg text-white">
              Add New Item
            </div>
          )}
        </button>
      </div>

      {/* Add Item Form */}
      {addGalleryItem && (
        <div className="my-10">
          <h3 className="text-xl font-semibold mb-4">Add New Gallery Item</h3>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            className="w-full p-2 border rounded-lg mb-4"
          />
          <div className="w-fit mb-4 p-2 border rounded-lg ">
            <select
              name="size"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="small">small</option>
              <option value="large">large</option>
            </select>
          </div>
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Add Item'}
          </button>
        </div>
      )}

      {/* Message when gallery is empty */}
      {!galleryItems.length && !isLoading && (
        <div className="mt-6 text-gray-600">
          <p>Gallery is empty. Add new items to display.</p>
        </div>
      )}

      {/* Gallery Items */}
      {isLoading ? (
        <div className="text-center mt-8">Loading gallery...</div>
      ) : (
        <div className="w-full overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {galleryItems.map((item) => (
            <div key={item._id} className="relative overflow-hidden">
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={`Gallery Item ${item._id}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  width={400}
                  height={300}
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              )}
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
