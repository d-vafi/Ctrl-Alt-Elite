import NetworkChat from "../components/Networking/NetworkChat";
import NetworkTinder from "../components/Networking/NetworkTinder";
import React, { useState } from "react";
const Networking = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const menu = ["Chat", "Tinder"];
  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4 sticky top-0">Networking</h1>
      <div className="flex-1">
        <ul className="flex space-x-4 mb-4">
          {menu.map((tab) => (
            <li
              key={tab}
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === tab.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div className="flex-1">
          {activeTab === "chat" && <NetworkChat />}
          {activeTab === "tinder" && <NetworkTinder />}
        </div>
      </div>
    </div>
  );
};

export default Networking;
