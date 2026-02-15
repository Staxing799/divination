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

const FULL_DECK = buildDeck();

function buildDeck() {
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

function shuffleCards(input) {
  const cards = [...input];
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function randomOrientation() {
  return Math.random() >= 0.5 ? 'UPRIGHT' : 'REVERSED';
}

export function createRitualPool(size = 6) {
  return shuffleCards(FULL_DECK)
    .slice(0, Math.max(6, size))
    .map((card) => ({ ...card, orientation: randomOrientation() }));
}

export function createSpreadFromPool(pool, selectedIndexes) {
  return {
    spread: 'THREE_CARD',
    cards: selectedIndexes.slice(0, 3).map((poolIndex, index) => {
      const card = pool[poolIndex];
      return {
        position: POSITIONS[index],
        cardId: card.id,
        name: card.name,
        arcana: card.arcana,
        suit: card.suit,
        rank: card.rank,
        orientation: card.orientation
      };
    })
  };
}

function positionLabel(position, locale) {
  if (locale === 'zh') {
    if (position === 'PAST') return '过去';
    if (position === 'PRESENT') return '现在';
    return '未来';
  }

  if (position === 'PAST') return 'Past';
  if (position === 'PRESENT') return 'Present';
  return 'Future';
}

function orientationLabel(orientation, locale) {
  if (locale === 'zh') {
    return orientation === 'REVERSED' ? '逆位' : '正位';
  }
  return orientation === 'REVERSED' ? 'Reversed' : 'Upright';
}

export function makeGuestReading({ question, spread, locale }) {
  const lead = locale === 'zh'
    ? `你的问题：${question}`
    : `Your question: ${question}`;
  const action = locale === 'zh'
    ? '行动建议：未来72小时只执行一个最小行动，验证本次牌阵方向。'
    : 'Action cue: pick one small action in the next 72 hours and test this direction.';

  const lines = [
    lead,
    ''
  ];

  for (const card of spread.cards) {
    lines.push(`${positionLabel(card.position, locale)}: ${card.name} (${orientationLabel(card.orientation, locale)})`);
  }

  lines.push('');
  lines.push(action);
  return lines.join('\n');
}
