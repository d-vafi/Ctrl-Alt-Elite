import axios from "axios";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const NetworkCreatePoll = (props) => {
  const { currentUserId, conversationId, setCreatePollModalIsOpen } = props;

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const [isMultiselect, setIsMultiselect] = useState(false);
  const [startTime, setStartTime] = useState(dayjs()); // Initialize with current time as a Day.js object
  const [endTime, setEndTime] = useState(null); // Initialize as null

  const handleCloseModal = () => {
    setCreatePollModalIsOpen(false);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleCreatePoll = async () => {
    if (!title.trim() || options.some((option) => !option.trim())) {
      alert("Please provide a title and valid options.");
      return;
    }

    const pollData = {
      conversationId,
      senderId: currentUserId,
      title,
      isMultiselect,
      votes: { ...options.map((option) => ({ option, votes: [] })) },
      startTime: startTime ? startTime.unix().toString() : null,
      endTime: endTime ? endTime.unix().toString() : null,
      isClosed: false,
    };
    console.log("Poll Data:", pollData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/poll/create",
        pollData
      );
      if (response.data.success) {
        alert("Poll created successfully!");
        handleCloseModal();
      } else {
        alert("Failed to create poll.");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("An error occurred while creating the poll.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80%] overflow-y-auto">
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-lg font-semibold">Create Poll</h2>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Poll Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter poll title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Poll Options
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="text-blue-500 hover:text-blue-700"
              >
                Add Option
              </button>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Allow Multiple Selections
              </label>
              <input
                type="checkbox"
                checked={isMultiselect}
                onChange={(e) => setIsMultiselect(e.target.checked)}
                className="mr-2"
              />
              <span>Enable</span>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Start Time
              </label>
              <DesktopDateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => (
                  <input
                    {...params}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Select start time"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                End Time
              </label>
              <DesktopDateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => (
                  <input
                    {...params}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Select end time"
                  />
                )}
              />
            </div>
          </div>

          <div className="border-t p-4 flex justify-end space-x-2">
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePoll}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Poll
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default NetworkCreatePoll;
