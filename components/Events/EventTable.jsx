import { X } from 'lucide-react';

const EventTable = ({ events, onDeleteEvent }) => {
  return (
    <div className="overflow-x-auto bg-white mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">All Events</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Venue</th>
            <th className="py-2 px-4 text-left hidden md:table-cell">
              Category
            </th>
            <th className="py-2 px-4 text-left hidden md:table-cell">Image</th>
            <th className="py-2 px-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id} className="border-b">
                <td className="py-2 px-4">{event.title}</td>
                <td className="py-2 px-4">{event.description}</td>
                <td className="py-2 px-4">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{event.venue}</td>
                <td className="py-2 px-4 hidden md:table-cell">
                  {event.category}
                </td>
                <td className="py-2 px-4 hidden md:table-cell">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onDeleteEvent(event._id)}
                    className="bg-red-500 text-white p-2 rounded-full ml-3"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-2 px-4 text-center text-gray-500">
                No events available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
