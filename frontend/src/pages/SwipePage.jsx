import React, { useState, useEffect } from "react";
import axios from "axios";
import SwipeDeck from "../components/SwipeDeck";

const SwipePage = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/events/otherusers",
          {
            params: { userId },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="swipe-page">
      <h1 className="text-2xl font-bold mb-4">Swipe to Match</h1>
      <SwipeDeck initialUsers={users} />
    </div>
  );
};

export default SwipePage;
