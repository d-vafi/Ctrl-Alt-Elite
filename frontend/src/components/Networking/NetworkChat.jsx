import "react-chat-elements/dist/main.css";
import { MessageBox, ChatList, Input } from "react-chat-elements";
import axios from "axios";
const NetworkChat = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const response = axios.get(
    `http://localhost:8080/api/conversation/${userId}`
  );
  console.log(response);
  const chats = [
    //replace with API call
    {
      name: "John Doe",
    },
    {
      name: "Jane Doe",
    },
    {
      name: "Bob Smith",
    },
    {
      name: "Alice Johnson",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Chat Page</h2>
      <div className="flex-1 flex flex-row">
        <div className="w-1/2 p-4">
          <ChatList
            dataSource={chats.map((user) => ({
              title: user.name,
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
