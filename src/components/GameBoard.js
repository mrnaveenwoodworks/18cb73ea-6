import React, { useState, useEffect } from "react";
import Card from "./Card";

const GameBoard = ({ 
  playerDeck, 
  computerDeck, 
  playerCard, 
  computerCard,
  roundWinner, 
  warCards = [], 
  isWarActive,
  roundCount,
  playerScore,
  computerScore,
  battleInProgress
}) => {
  const [showResult, setShowResult] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  
  // Reset and animate cards when a new round is played
  useEffect(() => {
    if (playerCard && computerCard) {
      setAnimateCards(true);
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
    
    return () => {};
  }, [playerCard, computerCard]);
  
  // Reset animations when cards are cleared
  useEffect(() => {
    if (!playerCard && !computerCard) {
      setShowResult(false);
      setAnimateCards(false);
    }
  }, [playerCard, computerCard]);
  
  // Determine result message
  const getResultMessage = () => {
    if (!showResult) return "";
    
    if (isWarActive) return "War!";
    if (roundWinner === "player") return "You win this round!";
    if (roundWinner === "computer") return "Computer wins this round!";
    return "It's a tie!";
  };
  
  // Get CSS class for result message
  const getResultClass = () => {
    if (isWarActive) return "text-red-600 font-bold text-2xl animate-pulse";
    if (roundWinner === "player") return "text-green-600 font-bold";
    if (roundWinner === "computer") return "text-red-600 font-bold";
    return "text-blue-600 font-bold";
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-green-800 rounded-2xl p-8 shadow-xl">
      {/* Game round info */}
      <div className="text-center mb-6">
        <div className="bg-green-900 inline-block px-6 py-2 rounded-full shadow-inner">
          <span className="text-white font-bold text-xl">
            {roundCount > 0 ? `Round ${roundCount}` : "War Card Game"}
          </span>
        </div>
      </div>
      
      {/* Computer side */}
      <div className="flex flex-col items-center mb-10">
        <div className="text-white text-lg font-semibold mb-2">Computer ({computerScore || 0})</div>
        <div className="relative">
          {/* Computer's deck */}
          <div className="absolute -left-48 top-0">
            <div className="flex flex-col items-center">
              <div className="mb-2 text-white text-sm">Computer's Deck</div>
              <div className="relative">
                {[...Array(Math.min(3, computerDeck.length))].map((_, index) => (
                  <div
                    key={`computer-deck-${index}`}
                    className="absolute"
                    style={{
                      top: `${index * 2}px`, 
                      left: `${index * 2}px`,
                      zIndex: index
                    }}
                  >
                    <Card isFlipped={true} />
                  </div>
                ))}
              </div>
              <div className="mt-2 text-white text-sm">{computerDeck.length} cards</div>
            </div>
          </div>
          
          {/* Computer's card in play */}
          <div className={`transform ${animateCards ? "translate-y-4" : ""} transition-transform duration-500`}>
            {computerCard ? (
              <Card 
                suit={computerCard.suit} 
                value={computerCard.value} 
                isAnimated={true} 
              />
            ) : (
              <div className="w-32 h-48 rounded-lg border-2 border-dashed border-gray-300 opacity-50"></div>
            )}
          </div>
        </div>
      </div>
      
      {/* Center area with war cards and result */}
      <div className="flex justify-center items-center relative h-24">
        {/* War cards in the middle */}
        {isWarActive && (
          <div className="absolute inset-0 flex justify-center">
            <div className="flex space-x-2">
              {warCards.map((_, index) => (
                <div 
                  key={`war-card-${index}`} 
                  className="transform rotate-90"
                  style={{
                    marginLeft: index % 2 === 0 ? "-30px" : "0",
                    zIndex: 10 + index
                  }}
                >
                  <Card isFlipped={true} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Battle result */}
        <div className={`bg-white px-6 py-2 rounded-full z-20 ${showResult ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <span className={getResultClass()}>{getResultMessage()}</span>
        </div>
        
        {/* Card movement animations would go here */}
        {battleInProgress && !isWarActive && (
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-16 h-16 border-t-4 border-b-4 border-green-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {/* Player side */}
      <div className="flex flex-col items-center mt-10">
        <div className="relative">
          {/* Player's card in play */}
          <div className={`transform ${animateCards ? "-translate-y-4" : ""} transition-transform duration-500`}>
            {playerCard ? (
              <Card 
                suit={playerCard.suit} 
                value={playerCard.value} 
                isAnimated={true} 
              />
            ) : (
              <div className="w-32 h-48 rounded-lg border-2 border-dashed border-gray-300 opacity-50"></div>
            )}
          </div>
          
          {/* Player's deck */}
          <div className="absolute -right-48 bottom-0">
            <div className="flex flex-col items-center">
              <div className="mb-2 text-white text-sm">Your Deck</div>
              <div className="relative">
                {[...Array(Math.min(3, playerDeck.length))].map((_, index) => (
                  <div
                    key={`player-deck-${index}`}
                    className="absolute"
                    style={{
                      top: `${index * 2}px`, 
                      left: `${index * 2}px`,
                      zIndex: index
                    }}
                  >
                    <Card isFlipped={true} />
                  </div>
                ))}
              </div>
              <div className="mt-2 text-white text-sm">{playerDeck.length} cards</div>
            </div>
          </div>
        </div>
        <div className="text-white text-lg font-semibold mt-2">You ({playerScore || 0})</div>
      </div>
      
      {/* Game instructions */}
      {!roundCount && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-2 rounded text-center max-w-sm">
          <p className="text-sm">Click "Start Game" to begin playing War! The player with the higher card wins each round.</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;