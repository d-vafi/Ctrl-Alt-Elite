import TinderCard from "react-tinder-card";
import React, { useState } from "react";
const users = [
  //replace with API call
  {
    name: "John Doe",
  },
  {
    name: "Jane Doe",
  },
  {
    name: "Bob Smith",
  },
  {
    name: "Alice Johnson",
  },
];
const NetworkTinder = () => {
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">Networking Tinder</h1>
      <div className="flex-1">
        {users.map((user) => (
          <TinderCard
            className="absolute"
            key={user.name}
            onSwipe={(dir) => swiped(dir, user.name)}
            onCardLeftScreen={() => outOfFrame(user.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{
                backgroundImage: `url(https://img.freepik.com/premium-photo/positive-optimistic-businessman-standing-dab-dance-pose-internet-meme-celebrating-success_416530-30908.jpg?w=996)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "360px",
                height: "460px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3 className="select-none absolute bottom-0 m-10 left-0">
                {user.name}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};
export default NetworkTinder;
