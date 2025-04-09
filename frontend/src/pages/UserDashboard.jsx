import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [sponsoredEvents, setSponsoredEvents] = useState([]);

  const userId = localStorage.getItem("userId");

  const hasRole = (role) =>
    user?.type?.toLowerCase()?.includes(role.toLowerCase());

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/users/me?userId=${userId}`
      );

      const userData = res.data.user;
      userData.registeredEvents = res.data.registeredEvents || [];
      userData.speakerInvitations = res.data.speakerInvitations || [];

      setUser(userData);
      setSponsoredEvents(res.data.sponsoredEvents || []);

      setFormData({
        fullName: userData.fullName,
        email: userData.email,
        affiliation: userData.affiliation,
        profession: userData.profession,
        organization: res.data.organization?.name || "",
        role: userData.type,
      });
    } catch (err) {
      console.error("Error fetching user", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName?.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email?.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (hasRole("Attendee") && !formData.affiliation?.trim())
      newErrors.affiliation = "Affiliation is required.";
    if (hasRole("Attendee") && !formData.profession?.trim())
      newErrors.profession = "Profession is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      await axios.put(
        `http://localhost:8080/api/users/me?userId=${userId}`,
        formData
      );
      alert("Profile updated!");
      setEditMode(false);
      fetchUser();
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update your profile.");
    }
  };

  const cancelRegistration = async (eventId) => {
    const event = user.registeredEvents.find((e) => e.id === eventId);
    if (!window.confirm(`Cancel registration for "${event.title}"?`)) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/users/registrations/${eventId}?userId=${userId}`
      );
      alert("Registration cancelled.");
      fetchUser();
    } catch (err) {
      console.error("Failed to cancel registration", err);
      alert("Failed to cancel.");
    }
  };

  const acceptInvitation = async (event) => {
    try {
      await axios.post(
        `http://localhost:8080/api/users/invitations/${event.id}/accept?userId=${userId}`,
        { userId }
      );
      alert(`Accepted invitation for ${event.title}`);
      fetchUser();
    } catch (err) {
      console.error("Failed to accept invitation", err);
      alert("Could not accept invitation.");
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        My Profile
      </h1>

      {/* Profile Section */}
      <div className="mb-8">
        {editMode ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold text-gray-800 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {hasRole("Attendee") && (
              <>
                <div className="mb-4">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    Affiliation
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                  {errors.affiliation && (
                    <p className="text-red-500 text-sm">{errors.affiliation}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block font-semibold text-gray-800 dark:text-gray-200">
                    Profession
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                  />
                  {errors.profession && (
                    <p className="text-red-500 text-sm">{errors.profession}</p>
                  )}
                </div>
              </>
            )}

            {hasRole("Stakeholder") && (
              <div className="mb-4">
                <label className="block font-semibold text-gray-800 dark:text-gray-200">
                  Organization
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Organization info is not editable.
                </p>
              </div>
            )}

            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Name:</strong> {user.fullName}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Email:</strong> {user.email}
            </p>
            {hasRole("Attendee") && (
              <>
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Affiliation:</strong> {user.affiliation}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Profession:</strong> {user.profession}
                </p>
              </>
            )}
            {hasRole("Stakeholder") && (
              <p className="text-gray-800 dark:text-gray-200">
                <strong>Organization:</strong> {formData.organization}
              </p>
            )}
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Role:</strong> {user.type}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* Registered Events */}
      {hasRole("Attendee") && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            My Events
          </h2>
          {user.registeredEvents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic text-center">
              You haven't registered for any events yet.
            </p>
          ) : (
            <div className="space-y-6">
              {user.registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm p-4 bg-white dark:bg-gray-700 transition hover:shadow-md"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Role: <span className="capitalize">{event.role}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date: {event.date}
                    </p>
                  </div>
                  <button
                    onClick={() => cancelRegistration(event.id)}
                    className="self-end sm:self-auto bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Speaker Invitations */}
      {user.speakerInvitations.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
            Invitations to Speak
          </h2>
          <ul className="space-y-4">
            {user.speakerInvitations.map((event) => (
              <li
                key={event.id}
                className="border p-4 rounded shadow flex justify-between items-center dark:border-gray-600 dark:bg-gray-700"
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {event.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    You're invited as a speaker
                  </p>
                </div>
                <button
                  onClick={() => acceptInvitation(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stakeholder Tools */}
      {hasRole("Stakeholder") && (
        <div className="border-t pt-6 dark:border-gray-600">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
            Stakeholder Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Events sponsored by your organization:
          </p>
          {sponsoredEvents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No events sponsored yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {sponsoredEvents.map((event) => (
                <li
                  key={event.id}
                  className="border p-4 rounded shadow dark:border-gray-600 dark:bg-gray-700"
                >
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sponsorship Amount: $
                    {event.sponsorshipAmount.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Organizer Tools */}
      {hasRole("Organizer") && (
        <div className="border-t pt-6 mt-6 dark:border-gray-600">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
            Organizer Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            You can create and manage events through the{" "}
            <a
              href="/eventplanning"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-500"
            >
              Event Planning
            </a>{" "}
            page.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
