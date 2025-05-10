/**
 * deckUtils.js - Utility functions for creating, shuffling, and dealing a deck of cards
 */

/**
 * Creates a standard 52-card deck
 * @returns {Array} An array of card objects
 */
export const createDeck = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const deck = [];

  // Create the 52-card deck with suit and value properties
  for (const suit of suits) {
    for (const value of values) {
      // Assign card values for comparison
      let numericValue;
      switch (value) {
        case "J": numericValue = 11; break;
        case "Q": numericValue = 12; break;
        case "K": numericValue = 13; break;
        case "A": numericValue = 14; break;
        default: numericValue = parseInt(value, 10);
      }

      deck.push({
        suit,
        value,
        numericValue
      });
    }
  }

  return deck;
};

/**
 * Shuffles a deck of cards using the Fisher-Yates algorithm
 * @param {Array} deck - The deck to shuffle
 * @returns {Array} A new shuffled deck
 */
export const shuffleDeck = (deck) => {
  // Create a copy of the deck to avoid modifying the original
  const shuffledDeck = [...deck];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at positions i and j
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  
  return shuffledDeck;
};

/**
 * Deals cards from a deck to players
 * @param {Array} deck - The deck to deal from
 * @param {Number} numPlayers - Number of players
 * @returns {Array} An array of player hands (each hand is an array of cards)
 */
export const dealCards = (deck, numPlayers) => {
  if (numPlayers < 1) {
    throw new Error("Number of players must be at least 1");
  }
  
  const playerHands = Array(numPlayers).fill().map(() => []);
  const deckCopy = [...deck]; // Create a copy to avoid modifying the original
  
  // Deal cards one by one to each player until deck is empty
  let currentPlayer = 0;
  while (deckCopy.length > 0) {
    playerHands[currentPlayer].push(deckCopy.pop());
    currentPlayer = (currentPlayer + 1) % numPlayers;
  }
  
  return playerHands;
};

/**
 * Splits a deck into two equal parts
 * @param {Array} deck - The deck to split
 * @returns {Array} An array containing two decks [deck1, deck2]
 */
export const splitDeck = (deck) => {
  const middleIndex = Math.ceil(deck.length / 2);
  return [
    deck.slice(0, middleIndex),
    deck.slice(middleIndex)
  ];
};

/**
 * Gets a visual representation of a card (for debugging)
 * @param {Object} card - The card object
 * @returns {String} A string representation of the card
 */
export const getCardDisplay = (card) => {
  if (!card) return "No card";
  
  const suitSymbols = {
    "hearts": "♥",
    "diamonds": "♦",
    "clubs": "♣",
    "spades": "♠"
  };
  
  return `${card.value}${suitSymbols[card.suit]}`;
};

/**
 * Checks if a deck is empty
 * @param {Array} deck - The deck to check
 * @returns {Boolean} True if the deck is empty, false otherwise
 */
export const isDeckEmpty = (deck) => {
  return deck.length === 0;
};

/**
 * Merges multiple cards into a single deck
 * @param {...Array} cards - Arrays of cards to merge
 * @returns {Array} A new array with all cards merged
 */
export const mergeCards = (...cards) => {
  return cards.flat();
};