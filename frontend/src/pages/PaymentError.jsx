import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentError = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const error = state?.error || "Unknown error occurred.";

  return (
    <div className="min-h-screen bg-red-100 flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold text-red-800 mb-4">❌ Payment Failed</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <p className="text-red-600 font-semibold mb-2">{error}</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/payment')}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentError;
