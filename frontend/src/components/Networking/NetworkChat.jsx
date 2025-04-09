import "react-chat-elements/dist/main.css";
import React, { useState, useEffect, useRef } from "react";
import { MessageBox, Input, ChatItem } from "react-chat-elements";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import PollIcon from "@mui/icons-material/Poll";
import Modal from "react-modal";
import NetworkAddUserToChat from "./NetworkAddUserToChat";
import NetworkCreatePoll from "./NetworkCreatePoll";
import NetworkPoll from "./NetworkPoll";
Modal.setAppElement("#root");

const NetworkChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [addUserModalIsOpen, setAddUserModalIsOpen] = useState(false);
  const [createPollModalIsOpen, setCreatePollModalIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const selectChat = async (conversationId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/conversation/getAllMessagesAndPolls/${conversationId}`
      );
      setMessages(response.data.messages);
      console.log("Messages:", response.data);
      setSelectedConversation(
        conversations.find((c) => c.id === conversationId)
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/conversation/${userId}`
        );
        const fetchedConversations = response.data.conversations;
        setConversations(fetchedConversations);

        if (fetchedConversations.length > 0) {
          const firstConversationId = fetchedConversations[0].id;
          selectChat(firstConversationId);
        } else {
          setSelectedConversation(null);
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [userId]);

  const sendMessage = async (message) => {
    if (!message.trim() || !selectedConversation) {
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/message/create", {
        conversationId: selectedConversation.id,
        senderId: userId,
        content: message,
      });
      const response = await axios.get(
        `http://localhost:8080/api/conversation/getAllMessagesAndPolls/${selectedConversation.id}`
      );
      setMessages(response.data.messages);
      setConversations((prevConversations) =>
        prevConversations.map((conversation) => {
          if (conversation.id === selectedConversation.id) {
            return {
              ...conversation,
              lastMessageTime: Date.now() / 1000,
              lastMessageSender: userId,
              lastMessage: message,
            };
          }
          return conversation;
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h2 className="text-xl font-bold">Chat</h2>
      </header>
      <div className="flex-1 flex flex-row overflow-hidden">
        <aside className="bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3">Conversations</h3>
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="flex flex-row items-center mb-2"
              >
                <ChatItem
                  key={conversation.id}
                  onClick={() => selectChat(conversation.id)}
                  subtitle={
                    conversation.lastMessageTime === null
                      ? "No messages yet"
                      : conversation.lastMessageSender === userId
                      ? "You: " + conversation.lastMessage
                      : conversation.users[conversation.lastMessageSender] +
                        ": " +
                        conversation.lastMessage
                  }
                  date={
                    conversation.lastMessageTime === null
                      ? null
                      : new Date(conversation.lastMessageTime * 1000)
                  }
                  title={Object.keys(conversation.users)
                    .filter((user) => user !== userId)
                    .map((user) => conversation.users[user])
                    .join(", ")}
                  avatar="/user-icon.png"
                  unread={
                    conversation.lastMessageSender !== userId &&
                    conversation.lastMessageTime >
                      (localStorage.getItem(`read-${conversation.id}`) || 0)
                  }
                  className={`cursor-pointer ${
                    selectedConversation?.id === conversation.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  } p-2 rounded`}
                />
                <div className="ml-auto">
                  <button
                    onClick={async () => {
                      console.log("Opening modal");
                      await selectChat(conversation.id);
                      setAddUserModalIsOpen(true);
                    }}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No conversations yet.</p>
          )}
        </aside>
        <main className="flex-1 bg-gray-50 p-4 flex flex-col justify-between">
          {selectedConversation ? (
            <>
              <div className="mb-4 p-3 bg-white shadow rounded">
                <h4 className="text-md font-semibold">
                  {Object.keys(selectedConversation.users)
                    .filter((user) => user !== userId)
                    .map((user) => selectedConversation.users[user])
                    .join(", ")}
                </h4>
                <p className="text-gray-500 text-sm">
                  Conversation started{" "}
                  {selectedConversation.createdAt &&
                    new Date(
                      selectedConversation.createdAt
                    ).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto mb-2">
                {messages.length > 0 ? (
                  messages.map((message) => {
                    if (message.votes) {
                      return (
                        <NetworkPoll
                          id={message.id}
                          senderId={message.senderId}
                          key={message.id}
                          title={message.title}
                          votes={message.votes}
                          isActive={message.isActive}
                          startTime={message.startTime}
                          endTime={message.endTime}
                          isMultiselect={message.isMultiselect}
                          isClosed={message.isClosed}
                        />
                      );
                    } else {
                      return (
                        <MessageBox
                          key={message.id}
                          title={selectedConversation.users[message.senderId]}
                          position={
                            message.senderId === userId ? "right" : "left"
                          }
                          text={message.content}
                          date={new Date(message.timestamp * 1000)}
                          type="text"
                          avatar="/user-icon.png"
                        />
                      );
                    }
                  })
                ) : (
                  <p className="text-gray-600 text-center mt-4">
                    No messages in this conversation yet.
                  </p>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="mt-2">
                <Input
                  className="rce-input-field"
                  placeholder="Type a message..."
                  multiline={false}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      sendMessage(event.target.value);
                      event.target.value = "";
                    }
                  }}
                  leftButtons={
                    <button
                      className="mr-2"
                      onClick={async () => {
                        console.log("Opening modal");
                        setCreatePollModalIsOpen(true);
                      }}
                    >
                      <PollIcon />
                    </button>
                  }
                  rightButtons={
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        const inputElement =
                          document.querySelector(".rce-input-field");
                        if (inputElement) {
                          console.log(inputElement);
                          sendMessage(inputElement.value);
                          inputElement.value = "";
                        }
                      }}
                    >
                      Send
                    </button>
                  }
                />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">
                Select a conversation to start messaging.
              </p>
            </div>
          )}
        </main>
      </div>
      <Modal isOpen={addUserModalIsOpen}>
        <NetworkAddUserToChat
          currentUserId={userId}
          conversationId={selectedConversation?.id}
          addUserModalIsOpen={addUserModalIsOpen}
          setAddUserModalIsOpen={setAddUserModalIsOpen}
        />
      </Modal>
      <Modal isOpen={createPollModalIsOpen}>
        <NetworkCreatePoll
          currentUserId={userId}
          conversationId={selectedConversation?.id}
          createPollModalIsOpen={createPollModalIsOpen}
          setCreatePollModalIsOpen={setCreatePollModalIsOpen}
        />
      </Modal>
    </div>
  );
};

export default NetworkChat;
