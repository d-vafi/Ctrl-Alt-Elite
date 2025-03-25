import React, { useEffect, useState } from "react";

// 🔧 Hardcoded mock user with dual roles
const initialMockUser = {
  fullName: "Youssef Ouakaa",
  email: "youssef@example.com",
  affiliation: "Concordia University",
  role: "Attendee,Stakeholder",
  profession: "Software Engineering Student",
  organization: "EduEvents Inc.",
  registeredEvents: [
    { id: 1, title: "AI for Education", date: "2025-04-10", role: "learner" },
    {
      id: 2,
      title: "Cybersecurity Trends",
      date: "2025-05-01",
      role: "speaker",
    },
  ],
  speakerInvitations: [
    { id: 3, title: "Quantum Computing for Beginners", status: "pending" },
  ],
};

const UserDashboard = () => {
  const [user, setUser] = useState(initialMockUser);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    affiliation: "",
    profession: "",
    organization: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      affiliation: user.affiliation,
      profession: user.profession,
      organization: user.organization,
    });
  }, [user]);

  const hasRole = (role) => user.role?.includes(role);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email format is invalid.";
    if (!formData.affiliation.trim())
      newErrors.affiliation = "Affiliation is required.";
    if (hasRole("Attendee") && !formData.profession.trim())
      newErrors.profession = "Profession is required for attendees.";
    if (hasRole("Stakeholder") && !formData.organization.trim())
      newErrors.organization =
        "Organization name is required for stakeholders.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;
    setUser((prev) => ({
      ...prev,
      ...formData,
    }));
    setEditMode(false);
    alert("Profile updated!");
  };

  const acceptInvitation = (event) => {
    setUser((prev) => ({
      ...prev,
      registeredEvents: [
        ...prev.registeredEvents,
        { ...event, role: "speaker" },
      ],
      speakerInvitations: prev.speakerInvitations.filter(
        (e) => e.id !== event.id
      ),
    }));
    alert(`Accepted invitation to speak at "${event.title}"`);
  };

  const cancelRegistration = (eventId) => {
    const event = user.registeredEvents.find((e) => e.id === eventId);
    if (!window.confirm(`Cancel registration for "${event.title}"?`)) return;

    setUser((prev) => ({
      ...prev,
      registeredEvents: prev.registeredEvents.filter((e) => e.id !== eventId),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        My Profile
      </h1>

      {/* Profile Section */}
      <div className="mb-8">
        {editMode ? (
          <>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Affiliation */}
            <div className="mb-4">
              <label className="block font-semibold">Affiliation</label>
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.affiliation && (
                <p className="text-red-500 text-sm">{errors.affiliation}</p>
              )}
            </div>

            {/* Profession (Attendee) */}
            {hasRole("Attendee") && (
              <div className="mb-4">
                <label className="block font-semibold">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.profession && (
                  <p className="text-red-500 text-sm">{errors.profession}</p>
                )}
              </div>
            )}

            {/* Organization (Stakeholder) */}
            {hasRole("Stakeholder") && (
              <div className="mb-4">
                <label className="block font-semibold">Organization Name</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm">{errors.organization}</p>
                )}
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
            <p>
              <strong>Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Affiliation:</strong> {user.affiliation}
            </p>
            {hasRole("Attendee") && (
              <p>
                <strong>Profession:</strong> {user.profession}
              </p>
            )}
            {hasRole("Stakeholder") && (
              <p>
                <strong>Organization:</strong> {user.organization}
              </p>
            )}
            <p>
              <strong>Role:</strong> {user.role}
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
          <h2 className="text-xl font-bold mb-3">My Events</h2>
          {user.registeredEvents.length === 0 ? (
            <p className="text-gray-600">
              You haven’t registered for any events yet.
            </p>
          ) : (
            <div className="space-y-4">
              {user.registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">Role: {event.role}</p>
                    <p className="text-sm text-gray-500">Date: {event.date}</p>
                  </div>
                  <button
                    onClick={() => cancelRegistration(event.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
          <h2 className="text-xl font-bold mb-3">Invitations to Speak</h2>
          <ul className="space-y-4">
            {user.speakerInvitations.map((event) => (
              <li
                key={event.id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-gray-600 text-sm">
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
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-3">Stakeholder Tools</h2>
          <p className="text-gray-600">
            As a stakeholder, you can manage events, track promotions, or review
            reports.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
