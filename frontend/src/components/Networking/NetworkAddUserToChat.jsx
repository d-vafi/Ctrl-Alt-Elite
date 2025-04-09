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
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Add User to Chat</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700"
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
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-gray-700">
                    {user.fullName || user.username}
                  </span>
                  <button
                    onClick={() => handleAddUser(user.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No users available to add.
            </p>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={handleCloseModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkAddUserToChat;
