import React, { useEffect, useState } from "react";
import axios from "axios";

const OrganizerDashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userRes = await axios.get(
          `http://localhost:8080/api/users/me?userId=${userId}`
        );
        const organizationId = userRes.data.user?.organizationId;

        if (!organizationId) {
          console.error("User has no organizationId");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/events/dashboard/${organizationId}`
        );
        setAnalytics(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading analytics dashboard...</p>;
  if (!analytics || analytics.length === 0)
    return <p className="text-center mt-10 text-gray-500">No events found.</p>;

  const totalSponsorships = analytics.reduce(
    (sum, e) => sum + e.sponsorships,
    0
  );
  const totalTicketRevenue = analytics.reduce(
    (sum, e) => sum + e.ticketRevenue,
    0
  );
  const totalRegisteredUsers = analytics.reduce(
    (sum, e) => sum + e.registeredUsers,
    0
  );
  const totalNetProfit = analytics.reduce((sum, e) => sum + e.netProfit, 0);
  const totalExpenses = analytics.reduce(
    (sum, e) => sum + e.rentCost + e.foodCost,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Event Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-12 text-center">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Sponsorships</p>
          <p className="text-xl font-semibold text-blue-700">
            ${totalSponsorships.toFixed(2)}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Ticket Revenue</p>
          <p className="text-xl font-semibold text-green-700">
            ${totalTicketRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Registered Users</p>
          <p className="text-xl font-semibold text-purple-700">
            {totalRegisteredUsers}
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-semibold text-red-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Net Profit</p>
          <p
            className={`text-xl font-semibold ${
              totalNetProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${totalNetProfit.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Per-Event Breakdown */}
      <div className="space-y-6">
        {analytics.map((event) => {
          const totalExpenses = event.rentCost + event.foodCost;
          const profitColor =
            event.netProfit >= 0 ? "text-green-600" : "text-red-600";

          return (
            <div
              key={event.eventId}
              className="border p-6 rounded-lg shadow-md bg-blue-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">
                {event.eventTitle}
              </h3>

              <div className="flex flex-wrap justify-center gap-6 text-center mb-4">
                <div className="bg-white border p-3 rounded w-48">
                  <p className="text-xs text-gray-500">Sponsorships</p>
                  <p className="text-lg font-semibold text-blue-700">
                    ${event.sponsorships.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white border p-3 rounded w-48">
                  <p className="text-xs text-gray-500">Ticket Revenue</p>
                  <p className="text-lg font-semibold text-green-700">
                    ${event.ticketRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white border p-3 rounded w-48">
                  <p className="text-xs text-gray-500">Registered Users</p>
                  <p className="text-lg font-semibold text-purple-700">
                    {event.registeredUsers}
                  </p>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="bg-white border p-3 rounded-lg text-center mb-4 w-full max-w-md mx-auto">
                <p className="text-xs text-gray-500">Total Expenses</p>
                <p className="text-lg font-semibold text-red-600">
                  ${totalExpenses.toFixed(2)}
                </p>
                <div className="flex justify-center mt-2 gap-4">
                  <div className="bg-orange-100 px-3 py-1 rounded text-sm text-gray-700">
                    <span className="font-semibold">Rent:</span> $
                    {event.rentCost.toFixed(2)}
                  </div>
                  <div className="bg-yellow-100 px-3 py-1 rounded text-sm text-gray-700">
                    <span className="font-semibold">Food:</span> $
                    {event.foodCost.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Net Profit */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-1">Net Profit</p>
                <p className={`text-2xl font-bold ${profitColor}`}>
                  ${event.netProfit.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
