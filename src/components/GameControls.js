import React from "react";

const GameControls = ({ 
  onDrawCard, 
  onRestart, 
  gameStarted, 
  gameOver, 
  battleInProgress, 
  warInProgress 
}) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Main action button - changes based on game state */}
      <button
        onClick={onDrawCard}
        disabled={gameOver || battleInProgress}
        className={`
          px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200
          ${gameOver 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : battleInProgress
              ? "bg-blue-300 text-blue-700 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }
          ${warInProgress ? "animate-pulse" : ""}
        `}
      >
        {!gameStarted ? "Start Game" : warInProgress ? "War!" : "Draw Cards"}
      </button>

      {/* Secondary controls */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </span>
          Restart Game
        </button>
        
        {/* Game speed controller - would need to be hooked up to state */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Speed:</span>
          <select 
            className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
            defaultValue="normal"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>

      {/* Game status messages */}
      {warInProgress && (
        <div className="mt-2 text-red-600 font-bold text-xl animate-bounce">
          It's a tie! WAR!
        </div>
      )}
      
      {gameOver && (
        <div className="mt-2 text-emerald-600 font-bold text-xl">
          Game Over! Click Restart to play again.
        </div>
      )}
    </div>
  );
};

export default GameControls;