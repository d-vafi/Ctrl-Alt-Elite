import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Protect against undefined state
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen bg-yellow-100 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ No payment data found</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/events')}
        >
          Go back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-4">✅ Payment Successful!</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <p><strong>Event ID:</strong> {result.eventId}</p>
        <p><strong>Original Price:</strong> ${result.amount.toFixed(2)}</p>
        <p><strong>Discount:</strong> {result.discountType}</p>
        <p><strong>Final Price:</strong> ${result.discountedAmount.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> {result.paymentType}</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/events')}
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
