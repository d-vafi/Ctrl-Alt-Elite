import React, { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import axios from "axios";
const SwipeDeck = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    setUsers(initialUsers); // Update users when initialUsers changes
  }, [initialUsers]);

  const handleSwipeLeft = () => {
    axios
      .post("http://localhost:8080/api/tindermatch/reject", {
        senderUserId: localStorage.getItem("userId"),
        receiverUserId: users[0].id,
      })
      .then((response) => {
        console.log("User rejected:", response.data);
      })
      .catch((error) => {
        console.error("Error rejecting user:", error);
      });
    setUsers((prevUsers) => prevUsers.slice(1));
  };

  const handleSwipeRight = () => {
    axios
      .post("http://localhost:8080/api/tindermatch/create", {
        senderUserId: localStorage.getItem("userId"),
        receiverUserId: users[0].id,
      })
      .then((response) => {
        console.log("User accepted:", response.data);
      })
      .catch((error) => {
        console.error("Error accepting user:", error);
      });
    setUsers((prevUsers) => prevUsers.slice(1));
  };

  console.log("Users after swipe:", users);

  return (
    <div className="">
      {users.length > 0 ? (
        <SwipeCard user={users[0]} />
      ) : (
        <p>No more users to show</p>
      )}
      {users.length > 0 && (
        <div className="flex justify-between mt-4">
          <button className="text-4xl" onClick={handleSwipeLeft}>
            &larr;
          </button>
          <button className="text-4xl" onClick={handleSwipeRight}>
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default SwipeDeck;
