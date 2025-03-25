import React, { useState } from 'react';
import SwipeCard from './SwipeCard';

const SwipeDeck = ({ users }) => {
const [currentIndex, setCurrentIndex] = useState(0);

const handleSwipe = (direction) => {
    if (direction === 'left') {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, users.length - 1));
    }
};

return (
    <div className="swipe-deck">
        {users.length > 0 && currentIndex < users.length ? (
            <SwipeCard user={users[currentIndex]} />
        ) : (
            <p>No more users to show</p>
        )}
        <div className="swipe-buttons">
            <button onClick={() => handleSwipe('left')}>&larr;</button>
            <button onClick={() => handleSwipe('right')}>&rarr;</button>
        </div>
    </div>
);
};

export default SwipeDeck;