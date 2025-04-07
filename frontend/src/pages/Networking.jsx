import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NetworkChat from "../components/Networking/NetworkChat";
import SwipePage from "./SwipePage";

const Networking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("tinder") ? "tinder" : "chat";

  const menu = [
    { name: "Chat", path: "/networking/chat" },
    { name: "Tinder", path: "/networking/tinder" },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4 sticky top-0">Networking</h1>
      <div className="flex-1">
        <ul className="flex space-x-4 mb-4">
          {menu.map((tab) => (
            <li
              key={tab.name}
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === tab.path.split("/").pop()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
        <div className="flex-1">
          {activeTab === "chat" && <NetworkChat />}
          {activeTab === "tinder" && <SwipePage />}
        </div>
      </div>
    </div>
  );
};

export default Networking;
