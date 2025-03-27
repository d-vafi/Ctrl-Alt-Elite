import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [userType, setUserType] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [sponsorshipAmount, setSponsorshipAmount] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((response) => setEvents(response.data))
      .catch((err) => console.error("Error fetching events:", err));

    const userId = localStorage.getItem("userId");
    if (isLoggedIn && userId) {
      axios
        .get(`http://localhost:8080/api/users/me`, {
          params: { userId },
        })
        .then((res) => {
          setUserEvents(res.data.registeredEvents || []);
          setInvitations(res.data.speakerInvitations || []);
          setUserType(res.data.user?.type || "");
          setOrganizationId(res.data.user?.organizationId || null);
        })
        .catch((err) => console.error("Error fetching user profile:", err));
    }
  }, [isLoggedIn]);

  const handleBuy = (eventId) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/payment?eventId=${eventId}`);
    }
  };

  const getEventStatus = (eventId) => {
    const registered = userEvents.find((e) => e.id === eventId);
    if (registered) return `Registered as ${registered.role}`;

    const invited = invitations.find((e) => e.id === eventId);
    if (invited) return "Invited to speak";

    return null;
  };

  const openModal = (eventId) => {
    setSelectedEventId(eventId);
    setSponsorshipAmount("");
    setModalOpen(true);
  };

  const confirmSponsorship = async () => {
    if (!sponsorshipAmount || isNaN(sponsorshipAmount)) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/events/${selectedEventId}/sponsor`,
        {
          organizationId,
          amount: parseFloat(sponsorshipAmount),
        }
      );
      alert("Sponsorship confirmed!");
      setEvents((prev) =>
        prev.map((e) =>
          e.id === selectedEventId
            ? {
                ...e,
                sponsorships: [
                  ...(e.sponsorships || []),
                  { organizationId, amount: parseFloat(sponsorshipAmount) },
                ],
              }
            : e
        )
      );
      setModalOpen(false);
      setSelectedEventId(null);
      setSponsorshipAmount("");
    } catch (err) {
      console.error("Error sponsoring event:", err);
      alert("Sponsorship failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events Catalog</h1>
      {events.map((event) => {
        const status = getEventStatus(event.id);
        const isSponsored = event.sponsorships?.some(
          (s) => s.organizationId === organizationId
        );

        return (
          <div
            key={event.id}
            className="border p-4 rounded shadow mb-4 w-full max-w-xl"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="font-bold mt-2">${event.price}</p>

            {userType === "Attendee" &&
              (status ? (
                <span className="mt-2 inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded">
                  {status}
                </span>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => handleBuy(event.id)}
                >
                  Buy Ticket
                </button>
              ))}

            {userType === "Stakeholder" && (
              <>
                {event.acceptsSponsorship ? (
                  isSponsored ? (
                    <span className="mt-2 inline-block px-4 py-2 bg-green-200 text-green-800 rounded">
                      You are a stakeholder for this event
                    </span>
                  ) : (
                    <button
                      className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
                      onClick={() => openModal(event.id)}
                    >
                      Sponsor this Event
                    </button>
                  )
                ) : (
                  <span className="mt-2 inline-block px-4 py-2 bg-red-100 text-red-700 rounded">
                    This event does not accept sponsorships
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Sponsorship Amount</h2>
            <input
              type="number"
              value={sponsorshipAmount}
              onChange={(e) => setSponsorshipAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmSponsorship}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCatalog;
