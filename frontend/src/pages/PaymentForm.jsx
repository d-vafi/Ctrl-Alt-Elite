import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PaymentForm = () => {
  const location = useLocation();
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [discountMethod, setDiscountMethod] = useState('noDiscountStrategy');
  const [paymentMethod, setPaymentMethod] = useState('creditCardPaymentStrategy');
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('eventId');
    setEventId(id);
  }, [location.search]);

  useEffect(() => {
    if (eventId) {
      axios.get(`http://localhost:8080/api/events/${eventId}`)
        .then((response) => {
          setEventData(response.data);
        })
        .catch((err) => {
          console.error('Error fetching event data:', err);
        });
    }
  }, [eventId]);

  useEffect(() => {
    if (!eventData) return;
  
    const fetchBackendPrice = async () => {
        try {
            const order = {
                amount: parseFloat(eventData.price),
                eventId: eventId,
              };
      
          const res = await axios.post(
            `http://localhost:8080/api/payments/preview?discountStrategy=${discountMethod}&paymentStrategy=${paymentMethod}`,
            order,
            { headers: { 'Content-Type': 'application/json' } }
          );
      
          setDiscountedAmount((order.amount - res.data.discountedAmount).toFixed(2));
          setTotalAmount(res.data.discountedAmount.toFixed(2));
        } catch (err) {
          console.error("Preview failed:", err);
        }
      };
      
  
    fetchBackendPrice();
  }, [eventData, discountMethod, paymentMethod]);
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const order = {
        amount: parseFloat(eventData.price),
        eventId: eventId
      };
  
      const response = await axios.post(
        `http://localhost:8080/api/payments/process?discountStrategy=${discountMethod}&paymentStrategy=${paymentMethod}`,
        order,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      navigate('/payment-success', { state: { result: response.data } });
    } catch (err) {
      navigate('/payment-error', { state: { error: err.message || 'Payment failed' } });
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Payment</h2>

      {eventData && (
        <div className="mb-6">
          <h3 className="text-xl font-bold">{eventData.title}</h3>
          <p className="text-gray-700">{eventData.description}</p>
          <p className="mt-2 text-lg">Price: <span className="font-semibold">${parseFloat(eventData.price).toFixed(2)}</span></p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="discountMethod" className="block font-bold">Discount Method:</label>
          <select
            id="discountMethod"
            name="discountMethod"
            value={discountMethod}
            onChange={(e) => setDiscountMethod(e.target.value)}
            className="border px-2 py-1"
           >
           <option value="noDiscountStrategy">No Discount</option>
           <option value="percentageDiscountStrategy">10% Off</option>
           <option value="tenDollarsOffDiscountStrategy">$10 Off</option>
           </select>

        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block font-bold">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="creditCardPaymentStrategy">Credit Card</option>
            <option value="paypalPaymentStrategy">PayPal</option>
          </select>
        </div>

        <div className="mb-4 border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">Summary:</h3>
          <p>Subtotal: <span className="font-medium">${eventData?.price.toFixed(2)}</span></p>
          <p>Discount: <span className="text-green-700">- ${discountedAmount}</span></p>
          <p className="text-xl font-bold mt-2">Total: <span className="text-blue-600">${totalAmount}</span></p>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Pay
        </button>
      </form>

      {result && (
        <div className="mt-4 p-2 bg-green-100">
          <h3 className="font-bold">Payment Processed:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100">
          <h3 className="font-bold">Error processing payment:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
