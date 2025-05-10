import React from "react";

const GameStats = ({ 
  rounds = 0, 
  playerCards = 0, 
  computerCards = 0,
  playerWins = 0,
  computerWins = 0,
  wars = 0,
  isGameActive = false
}) => {
  const totalCards = playerCards + computerCards;
  
  // Calculate percentages for progress bars
  const playerCardPercentage = totalCards > 0 ? (playerCards / totalCards) * 100 : 0;
  const computerCardPercentage = totalCards > 0 ? (computerCards / totalCards) * 100 : 0;
  
  // Calculate total rounds including current one
  const totalRounds = playerWins + computerWins + (isGameActive ? 0 : 1);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800 border-b pb-2">
        Game Statistics
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Rounds played */}
        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <div className="flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="21.49" y="82.75" width="213.02" height="90.51" rx="8" transform="translate(-53.02 128) rotate(-45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="64" x2="160" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="96" x2="128" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="128" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <span className="ml-2 font-semibold text-gray-700">Rounds</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{rounds}</p>
        </div>
        
        {/* Wars count */}
        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <div className="flex items-center justify-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="70.19" y="104.75" width="39.62" height="122.49" rx="8.01" transform="translate(-91.02 112.26) rotate(-45)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="104" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="80.44 128.43 152 40 216 40 216 104 127.57 175.56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M62,166,32.34,195.65a8,8,0,0,0,0,11.32L49,223.66a8,8,0,0,0,11.32,0L90,194" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            <span className="ml-2 font-semibold text-gray-700">Wars</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{wars}</p>
        </div>
      </div>
      
      {/* Player vs Computer Wins */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm text-gray-700">Round Wins</span>
          <div className="text-sm font-medium">
            <span className="text-green-600">{playerWins}</span>
            <span className="mx-1 text-gray-500">:</span>
            <span className="text-red-600">{computerWins}</span>
          </div>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div 
              className="bg-green-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${totalRounds ? (playerWins / totalRounds) * 100 : 50}%` }}
            ></div>
            <div 
              className="bg-red-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${totalRounds ? (computerWins / totalRounds) * 100 : 50}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>You</span>
          <span>Computer</span>
        </div>
      </div>
      
      {/* Card distribution */}
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm text-gray-700">Cards</span>
          <div className="text-sm font-medium">
            <span className="text-green-600">{playerCards}</span>
            <span className="mx-1 text-gray-500">:</span>
            <span className="text-red-600">{computerCards}</span>
          </div>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div
              className="bg-green-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${playerCardPercentage}%` }}
            ></div>
            <div
              className="bg-red-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${computerCardPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Your Deck</span>
          <span>Computer's Deck</span>
        </div>
      </div>
      
      {/* Game outcome prediction */}
      {isGameActive && totalCards > 0 && (playerCards !== computerCards) && (
        <div className="mt-4 text-center p-2 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">
            {playerCards > computerCards 
              ? `You're ahead! +${playerCards - computerCards} cards` 
              : `Computer is ahead! +${computerCards - playerCards} cards`}
          </p>
          <div className="mt-1">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              playerCards > computerCards * 1.5 || computerCards > playerCards * 1.5
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
            }`}>
              {playerCards > computerCards * 1.5
                ? "Strong advantage!"
                : computerCards > playerCards * 1.5
                  ? "Computer dominance"
                  : "Close match"
              }
            </span>
          </div>
        </div>
      )}
      
      {/* Game over message */}
      {!isGameActive && (
        <div className="mt-4 text-center p-2 bg-gray-100 rounded-lg">
          <p className="text-sm font-medium">
            {playerCards > computerCards 
              ? "You won the game! 🎉" 
              : computerCards > playerCards 
                ? "Computer won the game! 🤖"
                : "It's a tie! 🤝"}
          </p>
        </div>
      )}
    </div>
  );
};

export default GameStats;