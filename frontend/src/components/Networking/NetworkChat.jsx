import "react-chat-elements/dist/main.css";
import React, { useState, useEffect } from "react";
import { MessageBox, ChatList, Input } from "react-chat-elements";
import axios from "axios";
const NetworkChat = () => {
  const [conversations, setConversations] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/conversation/${userId}`
        );
        setConversations(response.data.conversations);
        console.log("Conversations:", response.data.conversations);
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
          <ChatList
            dataSource={conversations.map((conversation) => ({
              subtitle:
                (conversation.lastMessageSender === userId
                  ? "You: "
                  : conversation.users[conversation.lastMessageSender] + ": ") +
                conversation.lastMessage,
              date: new Date(conversation.lastMessageTime * 1000),
              title: Object.keys(conversation.users)
                .filter((user) => user !== userId)
                .map((user) => conversation.users[user])
                .join(", "),

              avatar:
                "https://img.freepik.com/premium-photo/positive-optimistic-businessman-standing-dab-dance-pose-internet-meme-celebrating-success_416530-30908.jpg?w=996",
            }))}
          />
        </div>
        <div className="w-1/2 p-4">
          <MessageBox
            position={"left"}
            type={"text"}
            title={"Message Box Title"}
            text="Here is a text type message box"
          />
          <Input placeholder="Type here..." multiline={true} />
        </div>
      </div>
    </div>
  );
};

export default NetworkChat;
