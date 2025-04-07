import React, { useState } from "react";

const EventPlanning = () => {
  const [mockEvents, setMockEvents] = useState([
    {
      id: 1,
      title: "Machine Learning Workshop",
      description: "This is a beginner-friendly activity to get you started in learning machine learning.",
      price: "37.99",
      date: "2025-05-10",
      acceptsSponsorship: true,
    },
    {
      id: 2,
      title: "Spring Boot Workshop",
      description: "Learn how to build APIs with Spring Boot and MongoDB.",
      price: "29.99",
      date: "2025-07-15",
      acceptsSponsorship: true,
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...mockEvents];
    updated[index][field] = field === "acceptsSponsorship" ? value === "true" : value;
    setMockEvents(updated);
  };

  const handleUpdate = (index) => {
    const event = mockEvents[index];
    alert(`Event "${event.title}" updated.`);
  };

  const handleCancel = (index) => {
    const event = mockEvents[index];
    alert(`Event "${event.title}" has been cancelled.`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Event Planning</h1>

      <div className="w-full max-w-3xl space-y-6">
        {mockEvents.map((event, index) => (
          <div key={event.id} className="bg-white shadow-md rounded p-6 space-y-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={event.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
              value={event.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={event.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              placeholder="Price"
            />
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-2"
              value={event.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
            />
            <select
              className="w-full border border-gray-300 rounded p-2"
              value={event.acceptsSponsorship}
              onChange={(e) => handleChange(index, "acceptsSponsorship", e.target.value)}
            >
              <option value="true">Accepts Sponsorship</option>
              <option value="false">Does Not Accept Sponsorship</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleUpdate(index)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleCancel(index)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPlanning;
