import React, { useState, useEffect } from "react";
import axios from "axios";

const EventPlanning = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    acceptsSponsorship: "true",
    speakers: "",
  });
  const [newSpeakerInput, setNewSpeakerInput] = useState({});
  const [organizationId, setOrganizationId] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:8080/api/users/me?userId=${userId}`
        );

        const orgId = userRes.data.user?.organizationId;
        setOrganizationId(orgId);

        const eventRes = await axios.get("http://localhost:8080/api/events");
        const orgEvents = eventRes.data.filter(
          (event) => event.organizerId === orgId
        );

        setEvents(orgEvents);

        const initialInputs = {};
        orgEvents.forEach((e) => (initialInputs[e.id] = ""));
        setNewSpeakerInput(initialInputs);
      } catch (err) {
        console.error("Error loading user/events:", err);
      }
    };

    fetchUserAndEvents();
  }, [userId]);

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateEvent = async () => {
    try {
      const invited = newEvent.speakers
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...newEvent,
        organizerId: organizationId,
        price: parseFloat(newEvent.price),
        acceptsSponsorship: newEvent.acceptsSponsorship === "true",
        speakers: [],
        invitedSpeakers: invited,
      };

      const res = await axios.post(
        "http://localhost:8080/api/events/create",
        payload
      );

      if (invited.length > 0) {
        await axios.post(
          `http://localhost:8080/api/events/${res.data.id}/invite-speakers`,
          invited
        );
      }

      alert(`Event "${res.data.title}" created.`);
      setIsModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        price: "",
        date: "",
        acceptsSponsorship: "true",
        speakers: "",
      });

      const refreshed = await axios.get("http://localhost:8080/api/events");
      const orgEvents = refreshed.data.filter(
        (event) => event.organizerId === organizationId
      );
      setEvents(orgEvents);
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event.");
    }
  };

  const handleEventChange = (index, field, value) => {
    const updated = [...events];
    if (field === "acceptsSponsorship") {
      updated[index][field] = value === "true";
    } else {
      updated[index][field] = value;
    }
    setEvents(updated);
  };

  const handleUpdate = async (index) => {
    const event = events[index];
    try {
      const payload = {
        ...event,
        price: parseFloat(event.price),
        speakers: event.speakers || [],
        invitedSpeakers: event.invitedSpeakers || [],
      };

      const res = await axios.put(
        `http://localhost:8080/api/events/${event.id}`,
        payload
      );
      alert(`Event "${res.data.title}" updated.`);
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update the event.");
    }
  };

  const handleCancel = async (index) => {
    const event = events[index];
    const confirm = window.confirm(`Cancel "${event.title}"?`);
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/events/${event.id}`);
      alert(`"${event.title}" cancelled.`);
      const updated = [...events];
      updated.splice(index, 1);
      setEvents(updated);
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };

  const handleInvite = async (eventId) => {
    const names = newSpeakerInput[eventId]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    if (!names.length) return alert("No valid names to invite.");

    try {
      await axios.post(
        `http://localhost:8080/api/events/${eventId}/invite-speakers`,
        names
      );
      alert("Speakers invited.");

      const refreshed = await axios.get("http://localhost:8080/api/events");
      const orgEvents = refreshed.data.filter(
        (event) => event.organizerId === organizationId
      );
      setEvents(orgEvents);
      setNewSpeakerInput({ ...newSpeakerInput, [eventId]: "" });
    } catch (err) {
      console.error("Error inviting speakers:", err);
      alert("Failed to invite speakers.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const futureEvents = events.filter((e) => e.date >= today);
  const pastEvents = events.filter((e) => e.date < today);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Event Planning</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Create Event
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleNewEventChange}
                className="w-full border rounded p-2"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleNewEventChange}
                rows="3"
                className="w-full border rounded p-2"
                placeholder="Description"
              />
              <input
                type="text"
                name="price"
                value={newEvent.price}
                onChange={handleNewEventChange}
                className="w-full border rounded p-2"
                placeholder="Price"
              />
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleNewEventChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="speakers"
                value={newEvent.speakers}
                onChange={handleNewEventChange}
                className="w-full border rounded p-2"
                placeholder="Comma-separated speakers to invite"
              />
              <select
                name="acceptsSponsorship"
                value={newEvent.acceptsSponsorship}
                onChange={handleNewEventChange}
                className="w-full border rounded p-2"
              >
                <option value="true">Accepts Sponsorship</option>
                <option value="false">Does Not Accept Sponsorship</option>
              </select>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FUTURE EVENTS */}
      <div className="w-full max-w-3xl space-y-6">
        {futureEvents.map((event, index) => {
          const confirmed = event.speakers || [];
          const invited =
            event.invitedSpeakers?.filter((s) => !confirmed.includes(s)) || [];

          return (
            <div key={event.id} className="bg-white shadow-md rounded p-6">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={event.title}
                onChange={(e) =>
                  handleEventChange(index, "title", e.target.value)
                }
              />
              <textarea
                className="w-full border p-2 rounded"
                rows="3"
                value={event.description}
                onChange={(e) =>
                  handleEventChange(index, "description", e.target.value)
                }
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={event.price}
                onChange={(e) =>
                  handleEventChange(index, "price", e.target.value)
                }
              />
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={event.date}
                onChange={(e) =>
                  handleEventChange(index, "date", e.target.value)
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={event.acceptsSponsorship}
                onChange={(e) =>
                  handleEventChange(index, "acceptsSponsorship", e.target.value)
                }
              >
                <option value="true">Accepts Sponsorship</option>
                <option value="false">Does Not Accept Sponsorship</option>
              </select>

              {confirmed.length > 0 && (
                <div className="mt-2">
                  <strong>Confirmed Speakers:</strong>
                  <ul className="space-y-1 mt-1">
                    {confirmed.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-green-700"
                      >
                        <span className="w-2 h-2 bg-green-600 rounded-full inline-block"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {invited.length > 0 && (
                <div className="mt-2">
                  <strong>Pending Invitations:</strong>
                  <ul className="space-y-1 mt-1">
                    {invited.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-yellow-700"
                      >
                        <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="text"
                  placeholder="Invite more speakers (comma-separated)"
                  className="flex-1 border p-2 rounded"
                  value={newSpeakerInput[event.id] || ""}
                  onChange={(e) =>
                    setNewSpeakerInput({
                      ...newSpeakerInput,
                      [event.id]: e.target.value,
                    })
                  }
                />
                <button
                  onClick={() => handleInvite(event.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Invite
                </button>
              </div>

              <div className="flex justify-end space-x-4 mt-3">
                <button
                  onClick={() => handleUpdate(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleCancel(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAST EVENTS */}
      {pastEvents.length > 0 && (
        <div className="w-full max-w-3xl mt-12">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Past Events</h2>
          <div className="space-y-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white shadow-md rounded p-6">
                <p>
                  <strong>Title:</strong> {event.title}
                </p>
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Price:</strong> ${event.price}
                </p>
                {event.speakers?.length > 0 && (
                  <p className="mt-2">
                    <strong>Speakers:</strong> {event.speakers.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPlanning;
