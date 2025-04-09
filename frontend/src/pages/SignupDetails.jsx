import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const baseData = location.state;

  const [formData, setFormData] = useState({
    profession: "",
    affiliation: "",
    organizationId: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState("");

  const role = baseData?.role;

  useEffect(() => {
    if (
      (role === "Stakeholder" || role === "Organizer") &&
      organizations.length === 0
    ) {
      axios
        .get("http://localhost:8080/api/organizations")
        .then((res) => setOrganizations(res.data))
        .catch((err) => console.error("Failed to load orgs", err));
    }
  }, [role, organizations.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...baseData,
      type: baseData.role,
    };

    // Add extra fields based on role
    if (role === "Attendee") {
      payload.profession = formData.profession;
      payload.affiliation = formData.affiliation;
    } else if (role === "Stakeholder" || role === "Organizer") {
      payload.organizationId = formData.organizationId;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/register", payload);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data || "Signup failed");
    }
  };

  if (!baseData) return <p className="text-center">Invalid access</p>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Complete Your {role} Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "Attendee" && (
            <>
              <div>
                <label className="block font-semibold">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold">Affiliation</label>
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}

          {(role === "Stakeholder" || role === "Organizer") && (
            <div>
              <label className="block font-semibold">Select Organization</label>
              <select
                name="organizationId"
                value={formData.organizationId}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select one</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
          >
            Finish Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupDetails;
