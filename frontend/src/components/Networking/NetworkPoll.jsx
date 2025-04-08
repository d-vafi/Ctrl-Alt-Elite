import React, { useState, useEffect } from "react";

const NetworkPoll = (props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const now = new Date().getTime();
    const startTime = new Date(props.startTime).getTime();
    const endTime = new Date(props.endTime).getTime();

    // Check if the poll is active
    if (now >= startTime && now <= endTime) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    // Schedule auto-close when the end time is reached
    if (now < endTime) {
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, endTime - now);

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [props.startTime, props.endTime]);

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-bold">{props.title}</h3>
      <p className="text-gray-600">{props.description}</p>
      <p className="text-sm text-gray-500">
        Starts: {new Date(props.startTime).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Ends: {new Date(props.endTime).toLocaleString()}
      </p>
      {isActive ? (
        <div>
          {props.options.map((option) => (
            <label key={option} className="block mb-2 cursor-pointer">
              <input
                type="radio"
                name="poll"
                value={option}
                onChange={() => onVote(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
          <button
            onClick={() => alert("Vote submitted!")}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit Vote
          </button>
        </div>
      ) : (
        <p className="text-red-500 mt-4">This poll is closed.</p>
      )}
    </div>
  );
};

export default NetworkPoll;
