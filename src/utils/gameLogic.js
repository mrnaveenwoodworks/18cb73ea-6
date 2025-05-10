/**
 * gameLogic.js - Logic for the War card game including comparing cards and determining winners.
 */

/**
 * Compares two cards to determine the winner
 * @param {Object} playerCard - The player's card with suit and value properties
 * @param {Object} computerCard - The computer's card with suit and value properties
 * @returns {String} "player" if player wins, "computer" if computer wins, "war" if tie
 */
export const compareCards = (playerCard, computerCard) => {
  // If either card is missing, can't compare
  if (!playerCard || !computerCard) {
    console.error("Cannot compare cards: One or both cards are missing");
    return null;
  }

  // Compare the numeric values of the cards
  if (playerCard.numericValue > computerCard.numericValue) {
    return "player";
  } else if (computerCard.numericValue > playerCard.numericValue) {
    return "computer";
  } else {
    return "war"; // Equal values result in war
  }
};

/**
 * Determines if the game is over based on deck sizes
 * @param {Array} playerDeck - The player's deck of cards
 * @param {Array} computerDeck - The computer's deck of cards
 * @returns {Boolean} True if the game is over, false otherwise
 */
export const isGameOver = (playerDeck, computerDeck) => {
  return playerDeck.length === 0 || computerDeck.length === 0;
};

/**
 * Determines the winner of the game
 * @param {Array} playerDeck - The player's deck of cards
 * @param {Array} computerDeck - The computer's deck of cards
 * @returns {String} "player" if player wins, "computer" if computer wins, "tie" if tie
 */
export const determineWinner = (playerDeck, computerDeck) => {
  if (playerDeck.length > computerDeck.length) {
    return "player";
  } else if (computerDeck.length > playerDeck.length) {
    return "computer";
  } else {
    return "tie";
  }
};

/**
 * Handles resolving a war situation
 * @param {Array} playerDeck - The player's deck of cards
 * @param {Array} computerDeck - The computer's deck of cards
 * @param {Array} warPile - Cards already in the war pile
 * @returns {Object} Object containing the winner and updated decks
 */
export const resolveWar = (playerDeck, computerDeck, warPile = []) => {
  // Check if either player doesn't have enough cards for war
  if (playerDeck.length < 2) {
    return {
      winner: "computer",
      playerDeck: [],
      computerDeck: [...computerDeck, ...playerDeck, ...warPile],
      warPile: []
    };
  }
  
  if (computerDeck.length < 2) {
    return {
      winner: "player",
      playerDeck: [...playerDeck, ...computerDeck, ...warPile],
      computerDeck: [],
      warPile: []
    };
  }
  
  // Each player puts one card face down
  const playerFaceDown = playerDeck[0];
  const computerFaceDown = computerDeck[0];
  
  // Each player puts one card face up
  const playerFaceUp = playerDeck[1];
  const computerFaceUp = computerDeck[1];
  
  // Remove the used cards from the decks
  const updatedPlayerDeck = playerDeck.slice(2);
  const updatedComputerDeck = computerDeck.slice(2);
  
  // Add face down cards to the war pile
  const updatedWarPile = [
    ...warPile, 
    playerFaceDown, 
    computerFaceDown,
    playerFaceUp,
    computerFaceUp
  ];
  
  // Compare the face up cards
  const result = compareCards(playerFaceUp, computerFaceUp);
  
  if (result === "player") {
    return {
      winner: "player",
      playerDeck: [...updatedPlayerDeck, ...updatedWarPile],
      computerDeck: updatedComputerDeck,
      warPile: []
    };
  } else if (result === "computer") {
    return {
      winner: "computer",
      playerDeck: updatedPlayerDeck,
      computerDeck: [...updatedComputerDeck, ...updatedWarPile],
      warPile: []
    };
  } else {
    // Another war! Continue the war recursively
    return resolveWar(updatedPlayerDeck, updatedComputerDeck, updatedWarPile);
  }
};

/**
 * Calculates the probability of winning based on current deck sizes
 * @param {Array} playerDeck - The player's deck of cards
 * @param {Array} computerDeck - The computer's deck of cards
 * @returns {Number} A number between 0 and 1 representing player's chance of winning
 */
export const calculateWinProbability = (playerDeck, computerDeck) => {
  const totalCards = playerDeck.length + computerDeck.length;
  if (totalCards === 0) return 0.5; // No cards left, it's a tie
  
  return playerDeck.length / totalCards;
};

/**
 * Checks if a war is possible based on the current decks
 * @param {Array} playerDeck - The player's deck of cards
 * @param {Array} computerDeck - The computer's deck of cards
 * @returns {Boolean} True if war is possible, false otherwise
 */
export const isWarPossible = (playerDeck, computerDeck) => {
  return playerDeck.length >= 2 && computerDeck.length >= 2;
};

/**
 * Gets the status of the game as a human-readable string
 * @param {Array} playerDeck - The player's deck of cards
 * @param {Array} computerDeck - The computer's deck of cards
 * @param {Number} roundCount - The current round count
 * @returns {String} A string describing the game status
 */
export const getGameStatus = (playerDeck, computerDeck, roundCount = 0) => {
  const playerCardCount = playerDeck.length;
  const computerCardCount = computerDeck.length;
  
  if (playerCardCount === 0) {
    return "Computer wins the game!";
  }
  
  if (computerCardCount === 0) {
    return "Player wins the game!";
  }
  
  const cardDifference = Math.abs(playerCardCount - computerCardCount);
  const leadingPlayer = playerCardCount > computerCardCount ? "Player" : "Computer";
  
  if (cardDifference > 10) {
    return `${leadingPlayer} has a strong lead with ${cardDifference} more cards!`;
  }
  
  if (cardDifference > 5) {
    return `${leadingPlayer} is ahead by ${cardDifference} cards.`;
  }
  
  return "The game is close!";
};