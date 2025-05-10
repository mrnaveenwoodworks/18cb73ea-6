import React from "react";

const Card = ({ suit, value, isFlipped = false, isAnimated = false }) => {
  // Map card values to display values
  const displayValue = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "J": "J",
    "Q": "Q",
    "K": "K",
    "A": "A"
  };

  // Map suits to symbols and colors
  const suitMap = {
    "hearts": { symbol: "♥", color: "text-red-600" },
    "diamonds": { symbol: "♦", color: "text-red-600" },
    "clubs": { symbol: "♣", color: "text-gray-900" },
    "spades": { symbol: "♠", color: "text-gray-900" }
  };

  // Get the suit information
  const suitInfo = suitMap[suit] || { symbol: "?", color: "text-gray-900" };

  // Styles for card flipping animation
  const flipStyles = isAnimated
    ? "transition-all duration-300 transform"
    : "";
  const flippedStyles = isFlipped
    ? "bg-blue-700 shadow-inner"
    : "bg-white shadow-md";

  return (
    <div 
      className={`relative rounded-lg ${flipStyles} ${flippedStyles} w-32 h-48 flex flex-col justify-between p-2 border border-gray-300`}
    >
      {!isFlipped ? (
        <>
          <div className="flex flex-col items-start">
            <span className={`text-xl font-bold ${suitInfo.color}`}>{displayValue[value] || value}</span>
            <span className={`text-xl ${suitInfo.color}`}>{suitInfo.symbol}</span>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className={`text-5xl ${suitInfo.color}`}>{suitInfo.symbol}</span>
          </div>
          
          <div className="flex flex-col items-end self-end rotate-180">
            <span className={`text-xl font-bold ${suitInfo.color}`}>{displayValue[value] || value}</span>
            <span className={`text-xl ${suitInfo.color}`}>{suitInfo.symbol}</span>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-24 rounded-sm bg-white/30 flex items-center justify-center">
            <span className="text-xl font-bold text-white">WAR</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;