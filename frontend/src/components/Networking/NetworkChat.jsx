import "react-chat-elements/dist/main.css";
import React, { useState, useEffect } from "react";
import { MessageList, MessageBox, Input, ChatItem } from "react-chat-elements";
import axios from "axios";
const NetworkChat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("userId");
  const selectChat = async (conversationId) => {
    const response = await axios.get(
      `http://localhost:8080/api/message/conversation/${conversationId}`
    );
    console.log(response.data.messages);
    setMessages(response.data.messages);
    setSelectedConversation(conversations.find((c) => c.id === conversationId));
  };

  const sendMessage = async (message) => {
    try {
      await axios.post("http://localhost:8080/api/message/create", {
        conversationId: selectedConversation.id,
        senderId: userId,
        content: message,
      });
      const response = await axios.get(
        `http://localhost:8080/api/message/conversation/${selectedConversation.id}`
      );
      setMessages(response.data.messages);
      conversations.map((conversation) => {
        if (conversation.id === selectedConversation.id) {
          conversation.lastMessageTime = new Date() / 1000;
          conversation.lastMessageSender = userId;
          conversation.lastMessage = message;
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/conversation/${userId}`
        );
        console.log(response.data.conversations);
        setConversations(response.data.conversations);
        setSelectedConversation(response.data.conversations[0]);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Chat Page</h2>
      <div className="flex-1 flex flex-row">
        <div className="w-1/2 p-4">
          <h3 className="text-lg font-bold mb-4">Conversations</h3>
          {conversations.map((conversation) => (
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
              avatar="https://img.freepik.com/premium-photo/positive-optimistic-businessman-standing-dab-dance-pose-internet-meme-celebrating-success_416530-30908.jpg?w=996"
            />
          ))}
          {conversations.length === 0 && (
            <p className="text-gray-600">No conversations yet.</p>
          )}
        </div>
        <div className=" p-4">
          <h3 className="text-lg font-bold mb-4">Messages</h3>
          {messages.map((message) => {
            return (
              <MessageBox
                type="text"
                key={message.id}
                title={selectedConversation.users[message.senderId]}
                position={message.senderId === userId ? "right" : "left"}
                text={message.content}
                date={new Date(message.timestamp * 1000)}
              />
            );
          })}

          <Input
            placeholder="Type here..."
            multiline={false}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendMessage(event.target.value);
                event.target.value = "";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkChat;
