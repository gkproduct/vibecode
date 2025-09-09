(function () {
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  const HAND_SIZE = 4;

  const el = {
    lobby: document.getElementById('lobby'),
    playersList: document.getElementById('players-list'),
    playerName: document.getElementById('player-name'),
    addPlayer: document.getElementById('add-player'),
    startGame: document.getElementById('start-game'),
    quickFill: document.getElementById('quick-fill'),
    table: document.getElementById('table'),
    seats: document.getElementById('seats'),
    rankSelect: document.getElementById('rank-select'),
    targetSelect: document.getElementById('target-select'),
    turnIndicator: document.getElementById('turn-indicator'),
    stockCount: document.getElementById('stock-count'),
    askBtn: document.getElementById('ask-btn'),
    endTurnBtn: document.getElementById('end-turn-btn'),
    passDeviceBtn: document.getElementById('pass-device-btn'),
    revealBtn: document.getElementById('reveal-btn'),
    hideBtn: document.getElementById('hide-btn'),
    qtyInput: document.getElementById('qty-input'),
    colorSelect: document.getElementById('color-select'),
    suitsBox: document.getElementById('suits-box'),
    log: document.getElementById('log'),
    newGame: document.getElementById('new-game'),
  };

  const state = {
    players: [],
    deck: [],
    discard: [],
    current: 0,
    started: false,
    revealed: false,
  };

  function makeDeck() {
    const deck = [];
    for (const suit of SUITS) for (const rank of RANKS) deck.push({ suit, rank });
    return deck;
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function deal() {
    for (let r = 0; r < HAND_SIZE; r++) for (const p of state.players) p.hand.push(state.deck.pop());
  }
  function nextPlayerIndex(i) { return (i + 1) % state.players.length; }
  function countRankInHand(hand, rank) { return hand.filter(c => c.rank === rank).length; }
  function removeRankFromHand(hand, rank) {
    const taken = [];
    for (let i = hand.length - 1; i >= 0; i--) if (hand[i].rank === rank) taken.push(hand.splice(i, 1)[0]);
    return taken;
  }
  function checkBooks(player) {
    const counts = new Map();
    for (const c of player.hand) counts.set(c.rank, (counts.get(c.rank) || 0) + 1);
    for (const [rank, cnt] of counts) if (cnt === 4) {
      removeRankFromHand(player.hand, rank);
      player.books += 1;
      log(`${player.name} собрал(а) сундучок из ранга ${rank}!`);
    }
  }
  function log(msg) { el.log.textContent = msg; }

  // Lobby
  function renderPlayers() {
    el.playersList.innerHTML = '';
    state.players.forEach((p, idx) => {
      const div = document.createElement('div');
      div.className = 'player-chip';
      div.innerHTML = `<span class="name">${idx + 1}. ${p.name}</span>`;
      const rm = document.createElement('button');
      rm.type = 'button'; rm.textContent = 'Убрать';
      rm.addEventListener('click', () => { state.players.splice(idx, 1); updateStartEnabled(); renderPlayers(); });
      div.appendChild(rm);
      el.playersList.appendChild(div);
    });
  }
  function updateStartEnabled() { el.startGame.disabled = !(state.players.length >= 2 && state.players.length <= 6); }
  el.addPlayer.addEventListener('click', () => {
    const name = (el.playerName.value || '').trim();
    if (!name || state.players.length >= 6) return;
    state.players.push({ id: crypto.randomUUID(), name, hand: [], books: 0 });
    el.playerName.value = ''; updateStartEnabled(); renderPlayers();
  });
  el.quickFill.addEventListener('click', () => {
    const presets = ['Аня', 'Борис', 'Сергей', 'Мила', 'Дана', 'Юра'];
    while (state.players.length < 4) state.players.push({ id: crypto.randomUUID(), name: presets[state.players.length], hand: [], books: 0 });
    updateStartEnabled(); renderPlayers();
  });
  el.startGame.addEventListener('click', startGame);
  el.newGame.addEventListener('click', () => window.location.reload());

  // Game
  function startGame() {
    state.deck = shuffle(makeDeck());
    for (const p of state.players) { p.hand = []; p.books = 0; }
    deal();
    state.current = 0; state.started = true; state.revealed = false;
    mountTable(); updateUI();
    log(`${state.players[state.current].name} начинает игру.`);
  }
  function mountTable() {
    el.lobby.hidden = true; el.table.hidden = false;
    renderSeats(); refreshRankSelect(); refreshTargetSelect(); renderSuitChips();
  }
  function renderSeats() {
    el.seats.innerHTML = '';
    state.players.forEach((p, idx) => {
      const seat = document.createElement('div'); seat.className = 'seat';
      const header = document.createElement('div'); header.className = 'header';
      header.innerHTML = `<span class="name">${idx + 1}. ${p.name}</span><span class="books">${p.books} сун.</span>`;
      const hand = document.createElement('div'); hand.className = 'hand';
      const isCurrent = idx === state.current;
      if (isCurrent && state.revealed) {
        p.hand.forEach(card => {
          const c = document.createElement('div'); c.className = 'card'; c.dataset.suit = card.suit; c.textContent = `${card.rank}${card.suit}`; hand.appendChild(c);
        });
      } else {
        p.hand.forEach(() => { const c = document.createElement('div'); c.className = 'card'; c.textContent = '■'; hand.appendChild(c); });
      }
      seat.appendChild(header); seat.appendChild(hand); el.seats.appendChild(seat);
    });
  }
  function refreshRankSelect() {
    const current = state.players[state.current];
    const ranksInHand = Array.from(new Set(current.hand.map(c => c.rank)));
    el.rankSelect.innerHTML = '';
    ranksInHand.forEach(r => { const opt = document.createElement('option'); opt.value = r; opt.textContent = r; el.rankSelect.appendChild(opt); });
    el.askBtn.disabled = ranksInHand.length === 0 || el.targetSelect.options.length === 0;
  }
  function refreshTargetSelect() {
    el.targetSelect.innerHTML = '';
    state.players.forEach((p, idx) => { if (idx !== state.current) { const opt = document.createElement('option'); opt.value = String(idx); opt.textContent = p.name; el.targetSelect.appendChild(opt); } });
    el.askBtn.disabled = el.rankSelect.options.length === 0 || el.targetSelect.options.length === 0;
  }
  function updateUI() {
    el.turnIndicator.textContent = state.players[state.current].name;
    el.stockCount.textContent = String(state.deck.length);
    renderSeats(); refreshRankSelect(); refreshTargetSelect();
    el.endTurnBtn.disabled = false;
    el.revealBtn.hidden = state.revealed; el.hideBtn.hidden = !state.revealed;
    renderSuitChips();
  }

  // Wizard and actions
  el.revealBtn.addEventListener('click', () => { state.revealed = true; updateUI(); });
  el.hideBtn.addEventListener('click', () => { state.revealed = false; updateUI(); });
  el.endTurnBtn.addEventListener('click', endTurn);
  el.passDeviceBtn.addEventListener('click', () => endTurn(true));
  el.askBtn.addEventListener('click', () => {
    const r = el.rankSelect.value;
    const targetIdx = Number(el.targetSelect.value);
    const asker = state.players[state.current];
    const target = state.players[targetIdx];
    if (!r || Number.isNaN(targetIdx)) return;
    if (countRankInHand(asker.hand, r) === 0) { log('Нужно спрашивать ранг, который у тебя есть.'); return; }

    const qty = clamp(parseInt(el.qtyInput.value, 10) || 1, 1, 4);
    const color = el.colorSelect.value; // red|black|both
    const suits = getSelectedSuits();
    const colorToSuits = { red: ['♥', '♦'], black: ['♠', '♣'], both: ['♥', '♦', '♠', '♣'] };
    const allowed = new Set(colorToSuits[color]);
    if (!suits.length || suits.some(s => !allowed.has(s))) { log('Проверь выбор мастей для указанного цвета.'); return; }

    const matches = target.hand.filter(c => c.rank === r && suits.includes(c.suit));
    const takeN = Math.min(qty, matches.length);
    if (takeN > 0) {
      let taken = 0;
      for (let i = target.hand.length - 1; i >= 0 && taken < takeN; i--) {
        const c = target.hand[i];
        if (c.rank === r && suits.includes(c.suit)) { asker.hand.push(target.hand.splice(i, 1)[0]); taken++; }
      }
      log(`${asker.name} получил(а) ${takeN} ${r} (${suits.join(', ')}) от ${target.name} и ходит дальше.`);
      checkBooks(asker); updateUI();
    } else {
      if (state.deck.length > 0) {
        const drawn = state.deck.pop(); asker.hand.push(drawn);
        log(`${target.name} не имеет ${qty}× ${r} (${suits.join(', ')}). ${asker.name} берёт карту.`);
        checkBooks(asker);
      } else { log(`${target.name} не имеет ${qty}× ${r} (${suits.join(', ')}). Колода пуста.`); }
      endTurn();
    }
  });

  function endTurn(passed) {
    state.revealed = false;
    for (const p of state.players) if (p.hand.length === 0 && state.deck.length > 0) {
      const toDeal = Math.min(HAND_SIZE, state.deck.length);
      for (let i = 0; i < toDeal; i++) p.hand.push(state.deck.pop());
      checkBooks(p);
    }
    const totalBooks = state.players.reduce((s, p) => s + p.books, 0);
    const totalRanks = 13;
    const noCards = state.deck.length === 0 && state.players.every(p => p.hand.length === 0);
    if (totalBooks >= totalRanks || noCards) {
      const maxBooks = Math.max(...state.players.map(p => p.books));
      const winners = state.players.filter(p => p.books === maxBooks).map(p => p.name).join(', ');
      log(`Игра окончена. Победитель(и): ${winners} (${maxBooks} сун.)`);
      el.askBtn.disabled = true; el.endTurnBtn.disabled = true; return;
    }
    state.current = nextPlayerIndex(state.current);
    if (!passed) log(`Ход переходит к ${state.players[state.current].name}.`);
    updateUI();
  }

  function renderSuitChips() {
    const box = el.suitsBox; box.innerHTML = '';
    ['♠', '♥', '♦', '♣'].forEach(s => {
      const chip = document.createElement('button');
      chip.type = 'button'; chip.className = 'suit-chip'; chip.textContent = s; chip.dataset.suit = s;
      chip.addEventListener('click', () => { chip.classList.toggle('active'); });
      box.appendChild(chip);
    });
  }
  function getSelectedSuits() { return Array.from(el.suitsBox.querySelectorAll('.suit-chip.active')).map(b => b.dataset.suit); }
  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
})();

(function () {
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
  const HAND_SIZE = 4; // классика: по 4 карты

  const el = {
    lobby: document.getElementById('lobby'),
    playersList: document.getElementById('players-list'),
    playerName: document.getElementById('player-name'),
    addPlayer: document.getElementById('add-player'),
    startGame: document.getElementById('start-game'),
    quickFill: document.getElementById('quick-fill'),
    table: document.getElementById('table'),
    seats: document.getElementById('seats'),
    rankSelect: document.getElementById('rank-select'),
    targetSelect: document.getElementById('target-select'),
    turnIndicator: document.getElementById('turn-indicator'),
    stockCount: document.getElementById('stock-count'),
    askBtn: document.getElementById('ask-btn'),
    endTurnBtn: document.getElementById('end-turn-btn'),
    passDeviceBtn: document.getElementById('pass-device-btn'),
    log: document.getElementById('log'),
    newGame: document.getElementById('new-game'),
  };

  const state = {
    players: [], // {id, name, hand: [card], books: number}
    deck: [],
    discard: [], // not used, but reserved
    current: 0,
    started: false,
  };

  // Utilities
  function makeDeck() {
    const deck = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) deck.push({ suit, rank });
    }
    return deck;
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function deal() {
    for (let r = 0; r < HAND_SIZE; r++) {
      for (const p of state.players) p.hand.push(state.deck.pop());
    }
  }
  function nextPlayerIndex(i) { return (i + 1) % state.players.length; }

  function countRankInHand(hand, rank) {
    return hand.filter(c => c.rank === rank).length;
  }
  function removeRankFromHand(hand, rank) {
    const taken = [];
    for (let i = hand.length - 1; i >= 0; i--) {
      if (hand[i].rank === rank) taken.push(hand.splice(i, 1)[0]);
    }
    return taken;
  }
  function checkBooks(player) {
    // find any rank with count 4
    const counts = new Map();
    for (const c of player.hand) counts.set(c.rank, (counts.get(c.rank) || 0) + 1);
    let made = 0;
    for (const [rank, cnt] of counts) {
      if (cnt === 4) {
        // remove all rank
        removeRankFromHand(player.hand, rank);
        player.books += 1;
        log(`${player.name} собрал(а) сундучок из ранга ${rank}!`);
        made++;
      }
    }
    return made;
  }

  function log(msg) {
    el.log.textContent = msg;
  }

  // Lobby
  function renderPlayers() {
    el.playersList.innerHTML = '';
    state.players.forEach((p, idx) => {
      const div = document.createElement('div');
      div.className = 'player-chip';
      div.innerHTML = `<span class="name">${idx + 1}. ${p.name}</span>`;
      const rm = document.createElement('button');
      rm.type = 'button';
      rm.textContent = 'Убрать';
      rm.addEventListener('click', () => {
        state.players.splice(idx, 1);
        updateStartEnabled();
        renderPlayers();
      });
      div.appendChild(rm);
      el.playersList.appendChild(div);
    });
  }
  function updateStartEnabled() {
    el.startGame.disabled = !(state.players.length >= 2 && state.players.length <= 6);
  }

  el.addPlayer.addEventListener('click', () => {
    const name = (el.playerName.value || '').trim();
    if (!name) return;
    if (state.players.length >= 6) return;
    state.players.push({ id: crypto.randomUUID(), name, hand: [], books: 0 });
    el.playerName.value = '';
    updateStartEnabled();
    renderPlayers();
  });
  el.quickFill.addEventListener('click', () => {
    const presets = ['Аня', 'Борис', 'Сергей', 'Мила', 'Дана', 'Юра'];
    while (state.players.length < 4) {
      const name = presets[state.players.length];
      state.players.push({ id: crypto.randomUUID(), name, hand: [], books: 0 });
    }
    updateStartEnabled();
    renderPlayers();
  });

  el.startGame.addEventListener('click', startGame);
  el.newGame.addEventListener('click', () => window.location.reload());

  // Game setup
  function startGame() {
    state.deck = shuffle(makeDeck());
    for (const p of state.players) { p.hand = []; p.books = 0; }
    deal();
    state.current = 0;
    state.started = true;
    mountTable();
    updateUI();
    log(`${state.players[state.current].name} начинает игру.`);
  }

  function mountTable() {
    el.lobby.hidden = true;
    el.table.hidden = false;
    renderSeats();
    refreshRankSelect();
    refreshTargetSelect();
  }

  function renderSeats() {
    el.seats.innerHTML = '';
    state.players.forEach((p, idx) => {
      const seat = document.createElement('div');
      seat.className = 'seat';
      const header = document.createElement('div');
      header.className = 'header';
      header.innerHTML = `<span class="name">${idx + 1}. ${p.name}</span><span class="books">${p.books} сун.</span>`;
      const hand = document.createElement('div');
      hand.className = 'hand';
      p.hand.forEach(card => {
        const c = document.createElement('div');
        c.className = 'card';
        c.dataset.suit = card.suit;
        c.textContent = `${card.rank}${card.suit}`;
        hand.appendChild(c);
      });
      seat.appendChild(header);
      seat.appendChild(hand);
      el.seats.appendChild(seat);
    });
  }

  function refreshRankSelect() {
    const current = state.players[state.current];
    const ranksInHand = Array.from(new Set(current.hand.map(c => c.rank)));
    el.rankSelect.innerHTML = '';
    for (const r of ranksInHand) {
      const opt = document.createElement('option');
      opt.value = r; opt.textContent = r;
      el.rankSelect.appendChild(opt);
    }
    el.askBtn.disabled = ranksInHand.length === 0 || el.targetSelect.options.length === 0;
  }
  function refreshTargetSelect() {
    el.targetSelect.innerHTML = '';
    state.players.forEach((p, idx) => {
      if (idx === state.current) return;
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = p.name;
      el.targetSelect.appendChild(opt);
    });
    el.askBtn.disabled = el.rankSelect.options.length === 0 || el.targetSelect.options.length === 0;
  }

  function updateUI() {
    el.turnIndicator.textContent = state.players[state.current].name;
    el.stockCount.textContent = String(state.deck.length);
    renderSeats();
    refreshRankSelect();
    refreshTargetSelect();
    el.endTurnBtn.disabled = false;
  }

  // Actions
  el.askBtn.addEventListener('click', () => {
    const r = el.rankSelect.value;
    const targetIdx = Number(el.targetSelect.value);
    const asker = state.players[state.current];
    const target = state.players[targetIdx];
    if (!r || Number.isNaN(targetIdx)) return;
    if (countRankInHand(asker.hand, r) === 0) { log('Нужно спрашивать ранг, который у тебя есть.'); return; }

    const have = countRankInHand(target.hand, r);
    if (have > 0) {
      const taken = removeRankFromHand(target.hand, r);
      asker.hand.push(...taken);
      log(`${asker.name} получил(а) ${taken.length} карт(ы) ${r} от ${target.name} и ходит дальше.`);
      checkBooks(asker);
      updateUI();
    } else {
      // Go fish (draw one), turn ends
      if (state.deck.length > 0) {
        const drawn = state.deck.pop();
        asker.hand.push(drawn);
        log(`${target.name} не имеет ${r}. ${asker.name} берёт карту из колоды.`);
        checkBooks(asker);
      } else {
        log(`${target.name} не имеет ${r}. Колода пуста.`);
      }
      endTurn();
    }
  });

  el.endTurnBtn.addEventListener('click', endTurn);
  el.passDeviceBtn.addEventListener('click', () => { endTurn(true); });

  function endTurn(passed) {
    // Check if someone has empty hand -> draw up to HAND_SIZE if stock remains
    for (const p of state.players) {
      if (p.hand.length === 0 && state.deck.length > 0) {
        const toDeal = Math.min(HAND_SIZE, state.deck.length);
        for (let i = 0; i < toDeal; i++) p.hand.push(state.deck.pop());
        checkBooks(p);
      }
    }

    // Game end condition: all books (13 ranks) claimed or no cards anywhere
    const totalBooks = state.players.reduce((s, p) => s + p.books, 0);
    const totalRanks = 13;
    const noCards = state.deck.length === 0 && state.players.every(p => p.hand.length === 0);
    if (totalBooks >= totalRanks || noCards) {
      const maxBooks = Math.max(...state.players.map(p => p.books));
      const winners = state.players.filter(p => p.books === maxBooks).map(p => p.name).join(', ');
      log(`Игра окончена. Победитель(и): ${winners} (${maxBooks} сун.)`);
      el.askBtn.disabled = true; el.endTurnBtn.disabled = true;
      return;
    }

    state.current = nextPlayerIndex(state.current);
    if (!passed) log(`Ход переходит к ${state.players[state.current].name}.`);
    updateUI();
  }
})();


