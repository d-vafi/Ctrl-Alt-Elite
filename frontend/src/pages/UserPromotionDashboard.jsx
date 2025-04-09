import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPromotionDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    axios.get("http://localhost:8080/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Error loading campaigns:", err));
  }, []);

  const handleSubscribe = async (id) => {
    try {
      console.log(userEmail);
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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">User Promotion Dashboard</h1>

      <div className="w-full max-w-3xl">
        {campaigns.map((campaign) => {
          const isSubscribed = campaign.recipients.includes(userEmail);
          return (
            <div key={campaign.id} className="bg-white dark:bg-gray-900 shadow-md rounded p-6 mb-4 transition-colors">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{campaign.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{campaign.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Type: {campaign.type}</p>
              <div className="mt-4">
                {isSubscribed ? (
                  <button
                    onClick={() => handleUnsubscribe(campaign.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(campaign.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
