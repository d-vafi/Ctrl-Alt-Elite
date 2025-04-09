import React from "react";

const SwipeCard = ({ user }) => {
  return (
    <div className="flex flex-col items-center rounded-xl justify-center p-4 border shadow-lg w-full">
      <img
        src="/user-icon.png"
        alt={`${user.fullName || user.username}'s profile`}
        style={{ width: "100px", height: "auto" }}
      />
      <h2 className="text-lg pt-4">{user.fullName || user.username}</h2>
      <p>{user.bio}</p>
    </div>
  );
};

export default SwipeCard;
