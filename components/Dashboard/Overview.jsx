// components/Dashboard/Overview.jsx
const Overview = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">E-Cell Dashboard Overview</h2>
      <p className="text-lg mb-8">
        Welcome to the E-Cell Dashboard! Below is a quick overview of the
        current status of our events, users, and gallery.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Events */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Events</h3>
          <p className="text-4xl font-bold">15</p>
        </div>

        {/* Total Users */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold">120</p>
        </div>

        {/* Total Gallery Items */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Gallery Items</h3>
          <p className="text-4xl font-bold">40</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="font-semibold text-gray-700">New Event:</span>{' '}
            Annual Conference added
          </li>
          <li className="flex items-center">
            <span className="font-semibold text-gray-700">New User:</span> John
            Doe joined the platform
          </li>
          <li className="flex items-center">
            <span className="font-semibold text-gray-700">
              New Gallery Item:
            </span>{' '}
            Event Banner uploaded
          </li>
          <li className="flex items-center">
            <span className="font-semibold text-gray-700">New User:</span> Alice
            Smith joined the platform
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
