import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SwipeDeck from '../components/SwipeDeck';

// const SwipePage = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/users')
//       .then(response => setUsers(response.data))
//       .catch(err => console.error("Error fetching users:", err));
//   }, []);

//   return (
//     <div className="swipe-page">
//       <h1 className="text-2xl font-bold mb-4">Swipe to Match</h1>
//       <SwipeDeck users={users} />
//     </div>
//   );
// };

const SwipePage = () => {
    const users = [
        { id: 1, name: 'User One', age: 25, avatar: 'user-icon.png' },
        { id: 2, name: 'User Two', age: 30, avatar: 'user-icon.png' },
        { id: 3, name: 'User three', age: 56, avatar: 'user-icon.png' },
        { id: 4, name: 'User four', age: 16, avatar: 'user-icon.png' },
        { id: 5, name: 'User 5', age: 73, avatar: 'user-icon.png' },
        { id: 6, name: 'User 6', age: 34, avatar: 'user-icon.png' },
        { id: 7, name: 'User 7', age: 22, avatar: 'user-icon.png' },
        { id: 8, name: 'User 8', age: 22, avatar: 'user-icon.png' },
        { id: 9, name: 'User 9', age: 22, avatar: 'user-icon.png' },
        { id: 10, name: 'User 10', age: 23, avatar: 'user-icon.png' },
        { id: 11, name: 'User 11', age: 28, avatar: 'user-icon.png' },
        { id: 12, name: 'User 12', age: 26, avatar: 'user-icon.png' },
        { id: 13, name: 'User 13', age: 28, avatar: 'user-icon.png' },
    ];

    return (
        <div className="swipe-page">
            <h1 className="text-2xl font-bold mb-4">Swipe to Match</h1>
            <SwipeDeck users={users} />
        </div>
    );
};

export default SwipePage;