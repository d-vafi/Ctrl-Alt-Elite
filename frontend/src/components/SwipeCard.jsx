import React from 'react';

const SwipeCard = ({ user }) => {
    return (
        <div className="swipe-card">
             <img 
                src="/user-icon.png" 
                alt={`${user.name}'s profile`} 
                style={{ width: '100px', height: 'auto' }} 
            /><h2>{user.name}</h2>
            <p>{user.bio}</p>
            <button onClick={() => alert(`You swiped on ${user.name}`)}>Swipe</button>
        </div>
    );
};

export default SwipeCard;