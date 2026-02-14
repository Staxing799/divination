import { randomInt } from 'node:crypto';

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
const POSITIONS = ['PAST', 'PRESENT', 'FUTURE'];

const FULL_DECK = buildFullDeck();

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

export function formatSpreadForPrompt(spread) {
  return spread.cards
    .map((card) => {
      const orientation = card.orientation === 'REVERSED' ? 'Reversed' : 'Upright';
      return `- ${card.position}: ${card.name} (${orientation}, ${card.arcana}${card.suit ? `, ${card.suit}` : ''})`;
    })
    .join('\n');
}
