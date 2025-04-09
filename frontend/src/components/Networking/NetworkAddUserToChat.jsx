import axios from "axios";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const NetworkAddUserToChat = (props) => {
  const {
    currentUserId,
    conversationId,
    setAddUserModalIsOpen,
    fetchConversations,
  } = props;
  const [potentialUsers, setPotentialUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/events/otherusers/connected",
        {
          params: {
            currentUserId,
            conversationId,
          },
        }
      );
      console.log(response.data);
      setPotentialUsers(response.data);
    } catch (error) {
      console.error("Error fetching potential users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/conversation/addUser",
        { userId, conversationId }
      );
      if (response.data.success) {
        console.log("User added successfully:", response.data);
        setPotentialUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        fetchConversations();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCloseModal = () => {
    setAddUserModalIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-96 max-h-[80%] overflow-y-auto transition-colors">
        <div className="flex justify-between items-center border-b p-4 border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Add User to Chat
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-4">
          {potentialUsers.length > 0 ? (
            <ul className="space-y-4">
              {potentialUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-700"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.fullName || user.username}
                  </span>
                  <button
                    onClick={() => handleAddUser(user.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No users available to add.
            </p>
          )}
        </div>

        <div className="border-t p-4 flex justify-end border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCloseModal}
            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkAddUserToChat;
