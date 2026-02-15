import { randomInt } from 'node:crypto';

export const POSITIONS = ['PAST', 'PRESENT', 'FUTURE'];

const MAJOR_ARCANA = [
  'The Fool',
  'The Magician',
  'The High Priestess',
  'The Empress',
  'The Emperor',
  'The Hierophant',
  'The Lovers',
  'The Chariot',
  'Strength',
  'The Hermit',
  'Wheel of Fortune',
  'Justice',
  'The Hanged Man',
  'Death',
  'Temperance',
  'The Devil',
  'The Tower',
  'The Star',
  'The Moon',
  'The Sun',
  'Judgement',
  'The World'
];

const MINOR_SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const MINOR_RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
const FULL_DECK = buildFullDeck();
const CARD_BY_ID = new Map(FULL_DECK.map((card) => [card.id, card]));

function buildFullDeck() {
  const majorCards = MAJOR_ARCANA.map((name, index) => ({
    id: `M${String(index).padStart(2, '0')}`,
    name,
    arcana: 'MAJOR',
    suit: null,
    rank: null
  }));

  const minorCards = [];
  for (const suit of MINOR_SUITS) {
    for (const rank of MINOR_RANKS) {
      minorCards.push({
        id: `${suit.slice(0, 1)}-${rank}`,
        name: `${rank} of ${suit}`,
        arcana: 'MINOR',
        suit,
        rank
      });
    }
  }

  return [...majorCards, ...minorCards];
}

function shuffledDeck() {
  const deck = [...FULL_DECK];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function drawThreeCardSpread() {
  const deck = shuffledDeck();
  return {
    spread: 'THREE_CARD',
    cards: POSITIONS.map((position, index) => {
      const base = deck[index];
      return {
        position,
        cardId: base.id,
        name: base.name,
        arcana: base.arcana,
        suit: base.suit,
        rank: base.rank,
        orientation: randomInt(2) === 0 ? 'UPRIGHT' : 'REVERSED'
      };
    })
  };
}

export function validateProvidedSpread(input) {
  if (!input) return null;
  if (input.spread !== 'THREE_CARD' || !Array.isArray(input.cards) || input.cards.length !== 3) {
    return null;
  }

  const usedIds = new Set();
  const cards = [];

  for (let index = 0; index < POSITIONS.length; index += 1) {
    const current = input.cards[index];
    if (!current || current.position !== POSITIONS[index]) {
      return null;
    }
    if (current.orientation !== 'UPRIGHT' && current.orientation !== 'REVERSED') {
      return null;
    }
    const base = CARD_BY_ID.get(current.cardId);
    if (!base || usedIds.has(base.id)) {
      return null;
    }
    if (base.name !== current.name || base.arcana !== current.arcana) {
      return null;
    }
    if ((base.suit || null) !== (current.suit || null)) {
      return null;
    }
    if ((base.rank || null) !== (current.rank || null)) {
      return null;
    }
    usedIds.add(base.id);
    cards.push({
      position: current.position,
      cardId: base.id,
      name: base.name,
      arcana: base.arcana,
      suit: base.suit,
      rank: base.rank,
      orientation: current.orientation
    });
  }

  return {
    spread: 'THREE_CARD',
    cards
  };
}

export function formatSpreadForPrompt(spread) {
  return spread.cards
    .map((card) => {
      const orientation = card.orientation === 'REVERSED' ? 'Reversed' : 'Upright';
      return `- ${card.position}: ${card.name} (${orientation}, ${card.arcana}${card.suit ? `, ${card.suit}` : ''})`;
    })
    .join('\n');
}
