import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPromotionDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    axios.get("http://localhost:8080/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error loading campaigns:", err));
  }, []);

  const handleSubscribe = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/campaigns/${id}/subscribe`, null, {
        params: { email: userEmail }
      });
      setCampaigns(prev => prev.map(c => c.id === id ? res.data : c));
    } catch (error) {
      console.error("Subscribe failed:", error);
    }
  };

  const handleUnsubscribe = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/campaigns/${id}/unsubscribe`, null, {
        params: { email: userEmail }
      });
      setCampaigns(prev => prev.map(c => c.id === id ? res.data : c));
    } catch (error) {
      console.error("Unsubscribe failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">User Promotion Dashboard</h1>

      <div className="w-full max-w-3xl">
        {campaigns.map((campaign) => {
          const isSubscribed = campaign.recipients.includes(userEmail);
          return (
            <div key={campaign.id} className="bg-white shadow-md rounded p-6 mb-4">
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p className="text-gray-700">{campaign.description}</p>
              <p className="text-sm text-gray-500 mt-1">Type: {campaign.type}</p>
              <div className="mt-4">
                {isSubscribed ? (
                  <button
                    onClick={() => handleUnsubscribe(campaign.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(campaign.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPromotionDashboard;
