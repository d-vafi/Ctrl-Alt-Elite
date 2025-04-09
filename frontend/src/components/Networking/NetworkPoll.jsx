import React, { useState, useEffect } from "react";

const NetworkPoll = (props) => {
  const {
    id,
    title,
    startTime,
    endTime,
    isMultiselect,
    votes,
    isClosed,
    senderId,
  } = props;
  const currentUserId = localStorage.getItem("userId");
  const [isActive, setIsActive] = useState(false);
  const [selectedVotes, setSelectedVotes] = useState({});
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const pollStartTime = parseInt(startTime, 10);
    const pollEndTime = endTime ? parseInt(endTime, 10) : Infinity;

    if (now >= pollStartTime && now <= pollEndTime && !isClosed) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (pollEndTime !== Infinity && now < pollEndTime) {
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, (pollEndTime - now) * 1000);

      return () => clearTimeout(timeout);
    }
  }, [startTime, endTime, isClosed]);

  const handleVoteChange = (optionIndex) => {
    if (isMultiselect) {
      setSelectedVotes((prevVotes) => ({
        ...prevVotes,
        [optionIndex]: !prevVotes[optionIndex],
      }));
    } else {
      setSelectedVotes({ [optionIndex]: true });
    }
  };

  const onVoteSubmit = async (selectedOptions) => {};

  const handleSubmitVote = () => {
    const selectedOptions = Object.keys(selectedVotes).filter(
      (key) => selectedVotes[key]
    );
    if (selectedOptions.length === 0) {
      alert("Please select at least one option.");
      return;
    }

    onVoteSubmit(selectedOptions);
    alert("Vote submitted!");
  };

  const handleClosePoll = async () => {
    const response = await fetch(`http://localhost:8080/api/poll/close/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId }),
    });

    if (response.ok) {
      alert("Poll closed successfully!");
    } else {
      alert("Failed to close poll.");
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">
        Starts: {new Date(parseInt(startTime, 10) * 1000).toLocaleString()}
      </p>
      {endTime && (
        <p className="text-sm text-gray-500">
          Ends: {new Date(parseInt(endTime, 10) * 1000).toLocaleString()}
        </p>
      )}
      {isActive ? (
        <div>
          {Object.entries(votes).map(([key, vote]) => (
            <label key={key} className="block mb-2 cursor-pointer">
              <input
                type={isMultiselect ? "checkbox" : "radio"}
                name="poll"
                value={key}
                checked={!!selectedVotes[key]}
                onChange={() => handleVoteChange(key)}
                className="mr-2"
              />
              {vote.option}
            </label>
          ))}
          <div className="flex flex-col items-start">
            <button
              onClick={handleSubmitVote}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Submit Vote
            </button>

            {senderId === currentUserId && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleClosePoll}
              >
                Close Poll
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-4">This poll is closed.</p>
      )}
    </div>
  );
};

export default NetworkPoll;
