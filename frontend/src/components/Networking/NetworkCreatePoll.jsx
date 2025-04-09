import axios from "axios";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const NetworkCreatePoll = (props) => {
  const {
    currentUserId,
    conversationId,
    setCreatePollModalIsOpen,
    fetchMessages,
    updateConversation,
    darkMode = false, // Add a darkMode prop with default value
  } = props;

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
      startTime: startTime
        ? startTime.set("second", 0).unix().toString()
        : null,
      endTime: endTime ? endTime.set("second", 0).unix().toString() : null,
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
        fetchMessages();
        updateConversation(conversationId, "Poll: " + title);
        handleCloseModal();
      } else {
        alert("Failed to create poll.");
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("An error occurred while creating the poll.");
    }
  };

  // Dynamic class assignments based on dark mode
  const modalClasses = `fixed inset-0 ${darkMode ? 'bg-gray-900' : 'bg-black'} bg-opacity-50 flex items-center justify-center z-50`;
  const cardClasses = `${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg w-96 max-h-[80%] overflow-y-auto`;
  const headerClasses = `flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b p-4`;
  const headingClasses = `text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`;
  const closeButtonClasses = `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`;
  const labelClasses = `block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`;
  const inputClasses = `w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} border rounded px-3 py-2`;
  const addOptionClasses = `${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`;
  const removeButtonClasses = `${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`;
  const cancelButtonClasses = `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} px-4 py-2 rounded`;
  const createButtonClasses = `${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`;
  const footerClasses = `${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t p-4 flex justify-end space-x-2`;
  const checkboxLabelClasses = `${darkMode ? 'text-gray-300' : 'text-gray-800'}`;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={modalClasses}>
        <div className={cardClasses}>
          <div className={headerClasses}>
            <h2 className={headingClasses}>Create Poll</h2>
            <button
              onClick={handleCloseModal}
              className={closeButtonClasses}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className={labelClasses}>
                Poll Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClasses}
                placeholder="Enter poll title"
              />
            </div>

            <div>
              <label className={labelClasses}>
                Poll Options
              </label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className={inputClasses}
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className={removeButtonClasses}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className={addOptionClasses}
              >
                Add Option
              </button>
            </div>

            <div>
              <label className={labelClasses}>
                Allow Multiple Selections
              </label>
              <input
                type="checkbox"
                checked={isMultiselect}
                onChange={(e) => setIsMultiselect(e.target.checked)}
                className="mr-2"
              />
              <span className={checkboxLabelClasses}>Enable</span>
            </div>

            <div>
              <label className={labelClasses}>
                Start Time
              </label>
              <DesktopDateTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                className={darkMode ? "dark-mode-date-picker" : ""}
                renderInput={(params) => (
                  <input
                    {...params}
                    className={inputClasses}
                    placeholder="Select start time"
                  />
                )}
              />
            </div>

            <div>
              <label className={labelClasses}>
                End Time
              </label>
              <DesktopDateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                className={darkMode ? "dark-mode-date-picker" : ""}
                renderInput={(params) => (
                  <input
                    {...params}
                    className={inputClasses}
                    placeholder="Select end time"
                  />
                )}
              />
            </div>
          </div>

          <div className={footerClasses}>
            <button
              onClick={handleCloseModal}
              className={cancelButtonClasses}
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePoll}
              className={createButtonClasses}
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