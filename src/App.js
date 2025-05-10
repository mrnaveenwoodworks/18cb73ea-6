import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import CardDeck from "./components/CardDeck";
import GameControls from "./components/GameControls";
import GameStats from "./components/GameStats";
import { createDeck, shuffleDeck } from "./utils/deckUtils";
import { compareCards } from "./utils/gameLogic";
import "./styles/App.css";

const App = () => {
  // Game state management
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [roundWinner, setRoundWinner] = useState(null);
  const [warCards, setWarCards] = useState([]);
  const [isWarActive, setIsWarActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [battleInProgress, setBattleInProgress] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [warCount, setWarCount] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1000); // Default game speed in ms

  // Initialize the game
  const initializeGame = () => {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);
    
    // Split the deck between player and computer
    const middleIndex = Math.ceil(shuffledDeck.length / 2);
    const playerInitialDeck = shuffledDeck.slice(0, middleIndex);
    const computerInitialDeck = shuffledDeck.slice(middleIndex);
    
    // Set initial state
    setPlayerDeck(playerInitialDeck);
    setComputerDeck(computerInitialDeck);
    setPlayerCard(null);
    setComputerCard(null);
    setRoundWinner(null);
    setWarCards([]);
    setIsWarActive(false);
    setGameStarted(false);
    setGameOver(false);
    setBattleInProgress(false);
    setRoundCount(0);
    setPlayerWins(0);
    setComputerWins(0);
    setWarCount(0);
  };

  // Start the game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for game over conditions
  useEffect(() => {
    if (gameStarted && (playerDeck.length === 0 || computerDeck.length === 0)) {
      setGameOver(true);
    }
  }, [playerDeck.length, computerDeck.length, gameStarted]);

  // Handle drawing a card
  const handleDrawCard = () => {
    // Start game if not started
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Can't draw if game is over or battle is in progress
    if (gameOver || battleInProgress) return;
    
    // Set battle in progress to prevent multiple draws
    setBattleInProgress(true);
    
    // Increment round counter
    setRoundCount(prev => prev + 1);
    
    // Draw cards
    if (isWarActive) {
      // Handle war scenario - already have cards drawn
      handleWar();
    } else {
      // Regular round - draw new cards
      drawNewCards();
    }
  };

  // Draw new cards from each deck
  const drawNewCards = () => {
    // Check if either player is out of cards
    if (playerDeck.length === 0 || computerDeck.length === 0) {
      setBattleInProgress(false);
      setGameOver(true);
      return;
    }
    
    // Get the top cards from each deck
    const newPlayerCard = playerDeck[0];
    const newComputerCard = computerDeck[0];
    
    // Update the decks (remove the top card)
    const updatedPlayerDeck = playerDeck.slice(1);
    const updatedComputerDeck = computerDeck.slice(1);
    
    // Set the drawn cards
    setPlayerCard(newPlayerCard);
    setComputerCard(newComputerCard);
    setPlayerDeck(updatedPlayerDeck);
    setComputerDeck(updatedComputerDeck);
    
    // Compare cards and determine winner
    setTimeout(() => {
      const result = compareCards(newPlayerCard, newComputerCard);
      handleComparisonResult(result, [newPlayerCard, newComputerCard], [], updatedPlayerDeck, updatedComputerDeck);
    }, gameSpeed);
  };

  // Handle the result of comparing cards
  const handleComparisonResult = (result, cardsInPlay, warPile, currentPlayerDeck, currentComputerDeck) => {
    switch (result) {
      case "player":
        // Player wins
        setRoundWinner("player");
        setPlayerWins(prev => prev + 1);
        
        // Player gets all cards
        const playerWinningCards = [...cardsInPlay, ...warPile];
        setPlayerDeck([...currentPlayerDeck, ...playerWinningCards]);
        
        // Reset war state if active
        if (isWarActive) {
          setIsWarActive(false);
          setWarCards([]);
        }
        
        // End battle after a delay
        setTimeout(() => {
          setPlayerCard(null);
          setComputerCard(null);
          setRoundWinner(null);
          setBattleInProgress(false);
        }, gameSpeed);
        break;
        
      case "computer":
        // Computer wins
        setRoundWinner("computer");
        setComputerWins(prev => prev + 1);
        
        // Computer gets all cards
        const computerWinningCards = [...cardsInPlay, ...warPile];
        setComputerDeck([...currentComputerDeck, ...computerWinningCards]);
        
        // Reset war state if active
        if (isWarActive) {
          setIsWarActive(false);
          setWarCards([]);
        }
        
        // End battle after a delay
        setTimeout(() => {
          setPlayerCard(null);
          setComputerCard(null);
          setRoundWinner(null);
          setBattleInProgress(false);
        }, gameSpeed);
        break;
        
      case "war":
        // Prepare for war
        setRoundWinner(null);
        setIsWarActive(true);
        setWarCount(prev => prev + 1);
        
        // Add current cards to war pile
        const updatedWarPile = [...warPile, ...cardsInPlay];
        setWarCards(updatedWarPile);
        
        // Clear current cards in play after a delay
        setTimeout(() => {
          setPlayerCard(null);
          setComputerCard(null);
          setBattleInProgress(false);
        }, gameSpeed);
        break;
        
      default:
        // Shouldn't reach here
        setBattleInProgress(false);
    }
  };

  // Handle war scenario
  const handleWar = () => {
    // Check if either player doesn't have enough cards for war
    if (playerDeck.length < 2 || computerDeck.length < 2) {
      // The player with more cards wins the war
      const winner = playerDeck.length > computerDeck.length ? "player" : "computer";
      
      // Update decks accordingly
      if (winner === "player") {
        setPlayerDeck([...playerDeck, ...computerDeck, ...warCards]);
        setComputerDeck([]);
      } else {
        setComputerDeck([...computerDeck, ...playerDeck, ...warCards]);
        setPlayerDeck([]);
      }
      
      // Reset war state
      setIsWarActive(false);
      setWarCards([]);
      setBattleInProgress(false);
      return;
    }
    
    // Take the top cards for the war (face down card + next card to compare)
    const playerWarCard = playerDeck[0]; // Face down card
    const playerFaceUpCard = playerDeck[1]; // Face up card for comparison
    const computerWarCard = computerDeck[0]; // Face down card
    const computerFaceUpCard = computerDeck[1]; // Face up card for comparison
    
    // Update the decks (remove the war cards)
    const updatedPlayerDeck = playerDeck.slice(2);
    const updatedComputerDeck = computerDeck.slice(2);
    
    // Set the drawn face-up cards
    setPlayerCard(playerFaceUpCard);
    setComputerCard(computerFaceUpCard);
    setPlayerDeck(updatedPlayerDeck);
    setComputerDeck(updatedComputerDeck);
    
    // Add face-down cards to the war pile
    const updatedWarPile = [...warCards, playerWarCard, computerWarCard];
    setWarCards(updatedWarPile);
    
    // Compare the new face-up cards
    setTimeout(() => {
      const result = compareCards(playerFaceUpCard, computerFaceUpCard);
      handleComparisonResult(
        result, 
        [playerFaceUpCard, computerFaceUpCard], 
        updatedWarPile, 
        updatedPlayerDeck, 
        updatedComputerDeck
      );
    }, gameSpeed);
  };

  // Handle restarting the game
  const handleRestart = () => {
    initializeGame();
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">War Card Game</h1>
        <p className="app-subtitle">
          A classic card game of chance and warfare
        </p>
      </header>

      {/* Main game container */}
      <div className="game-container">
        <div className="game-content">
          {/* Main game board */}
          <div className="game-board-container">
            <GameBoard
              playerDeck={playerDeck}
              computerDeck={computerDeck}
              playerCard={playerCard}
              computerCard={computerCard}
              roundWinner={roundWinner}
              warCards={warCards}
              isWarActive={isWarActive}
              roundCount={roundCount}
              playerScore={playerWins}
              computerScore={computerWins}
              battleInProgress={battleInProgress}
            />
          </div>

          {/* Sidebar with stats */}
          <div className="game-sidebar">
            <GameStats
              rounds={roundCount}
              playerCards={playerDeck.length}
              computerCards={computerDeck.length}
              playerWins={playerWins}
              computerWins={computerWins}
              wars={warCount}
              isGameActive={!gameOver && gameStarted}
            />
          </div>
        </div>

        {/* Game controls */}
        <div className="controls-container">
          <GameControls
            onDrawCard={handleDrawCard}
            onRestart={handleRestart}
            gameStarted={gameStarted}
            gameOver={gameOver}
            battleInProgress={battleInProgress}
            warInProgress={isWarActive}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} War Card Game | React Implementation</p>
      </footer>
    </div>
  );
};

export default App;