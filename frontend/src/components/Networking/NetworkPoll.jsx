import React, { useState, useEffect } from "react";
import axios from "axios";

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
    fetchMessages,
  } = props;

  const currentUserId = localStorage.getItem("userId");
  const [isActive, setIsActive] = useState(false);
  const [selectedVotes, setSelectedVotes] = useState({});

  // Initialize selectedVotes based on the user's previous votes
  useEffect(() => {
    const initialSelectedVotes = {};
    Object.entries(votes).forEach(([key, vote]) => {
      if (vote.votes.includes(currentUserId)) {
        initialSelectedVotes[key] = true;
      }
    });
    setSelectedVotes(initialSelectedVotes);
  }, [votes, currentUserId]);

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

  const onVoteSubmit = async (selectedOptions) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/poll/vote/${id}`,
        {
          userId: currentUserId,
          options: selectedOptions,
        }
      );
      if (response.data.success) {
        alert("Vote submitted successfully!");
        fetchMessages();
      } else {
        alert("Failed to submit vote.");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

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
    try {
      const response = await axios.post(
        `http://localhost:8080/api/poll/close/${id}`
      );
      if (response.data.success) {
        alert("Poll closed successfully!");
        fetchMessages();
      } else {
        alert("Failed to close poll.");
      }
    } catch (error) {
      console.error("Error closing poll:", error);
    }
  };

  const userAlreadyVoted = () => {
    const alreadyVotedOptions = Object.keys(votes).filter((key) =>
      votes[key].votes.includes(currentUserId)
    );
    return alreadyVotedOptions;
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
                onChange={() => handleVoteChange(key)}
                className="mr-2"
                checked={!!selectedVotes[key]} // Reflect the selectedVotes state
                disabled={isClosed || userAlreadyVoted().length > 0} // Disable if poll is closed or user has already voted
              />
              {vote.option}
            </label>
          ))}
          <div className="flex flex-col items-start">
            {!userAlreadyVoted().length > 0 && (
              <button
                onClick={handleSubmitVote}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                disabled={userAlreadyVoted().length > 0}
              >
                Submit Vote
              </button>
            )}

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
        <div>
          {Math.floor(Date.now() / 1000) < parseInt(startTime, 10) ? (
            <p className="text-yellow-500 mt-4">
              This poll hasn't started yet.
            </p>
          ) : (
            <>
              <p className="text-red-500 mt-4">This poll is closed.</p>
              <p>Results</p>
              {Object.entries(votes).map(([key, vote]) => (
                <div key={key} className="flex items-center mb-2">
                  <span className="mr-2">{vote.option}</span>
                  <span className="text-gray-500">
                    {vote.votes.length} vote{vote.votes.length !== 1 && "s"}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NetworkPoll;
