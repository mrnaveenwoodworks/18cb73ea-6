import React from "react";
import Card from "./Card";

const CardDeck = ({ cards = [], isPlayerDeck = false, cardCount }) => {
  const displayCount = cardCount || cards.length;
  const maxVisibleCards = 5; // Maximum number of cards to show in stack effect
  const visibleStackCount = Math.min(maxVisibleCards, displayCount);
  
  // Creates array for stack effect visualization
  const stackItems = Array.from({ length: visibleStackCount }, (_, index) => index);

  return (
    <div className="relative h-56">
      {/* Deck count label */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
        {displayCount} cards
      </div>

      {/* Empty deck placeholder when no cards */}
      {displayCount === 0 && (
        <div className="w-32 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <p className="text-gray-400 text-sm text-center">No Cards</p>
        </div>
      )}

      {/* Stack effect - show real top card if available */}
      {displayCount > 0 && (
        <div className="relative h-full">
          {/* Stack effect using empty placeholder cards */}
          {stackItems.map((i) => (
            <div
              key={`stack-${i}`}
              className={`absolute transition-all duration-100 rounded-lg`}
              style={{
                top: `${i * 2}px`,
                right: `${i * 2}px`,
                zIndex: visibleStackCount - i,
              }}
            >
              {/* Show actual top card for the first item if we have one */}
              {i === 0 && cards.length > 0 ? (
                <Card 
                  suit={cards[0].suit} 
                  value={cards[0].value}
                  isFlipped={!isPlayerDeck} 
                />
              ) : (
                // Otherwise show back of card
                <Card isFlipped={true} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Card counting animation space */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-6">
        {/* This space would be used for card animations during dealing */}
      </div>
    </div>
  );
};

export default CardDeck;