import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();  

  useEffect(() => {
    axios.get('http://localhost:8080/api/events')
      .then(response => setEvents(response.data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  const handleBuy = (eventId) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(`/payment?eventId=${eventId}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events Catalog</h1>
      {events.map(event => (
       <div key={event.id} className="border p-4 rounded shadow mb-4 w-full max-w-xl">
       <h2 className="text-xl font-semibold">{event.title}</h2>
       <p>{event.description}</p>
       <p className="font-bold mt-2">${event.price}</p>
       <button
         className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
         onClick={() => handleBuy(event.id)}
    >
      Buy Ticket
    </button>
  </div>
))}

    </div>
  );
};

export default EventCatalog;
