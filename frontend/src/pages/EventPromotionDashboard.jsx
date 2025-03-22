import React, { useEffect, useState } from "react";
import axios from "axios";

const EventPromotionDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    event: "",
    type: "",
    title: "",
    description: "",
    recipients: "",
  });

    // Inside the component
    const [events, setEvents] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8080/api/events")
        .then(response => setEvents(response.data))
        .catch(error => console.error("Error fetching events:", error));
    }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    setIsModalOpen(false); // Close the modal for now
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Event Promotion Dashboard</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Create Event Promotion
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create Promotion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700">Select Event</label>
                <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2 mt-1"
                >
                <option value="">Select an event</option>
                {events.map((event) => (
                    <option key={event.id} value={event.id}>
                    {event.title}
                    </option>
                ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Promotion Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                >
                  <option value="">Select type</option>
                  <option value="email">Email</option>
                  <option value="social">Social Media</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700">Recipients (comma-separated emails)</label>
                <input
                  type="text"
                  name="recipients"
                  value={formData.recipients}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPromotionDashboard;
