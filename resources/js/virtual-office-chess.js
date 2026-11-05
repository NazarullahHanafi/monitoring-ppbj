// Small original chess engine for a local practice board. Legal moves include
// check, castling, en passant and automatic queen promotion. No network or wagers.
export function createChess() {
    const board = [...'rnbqkbnrpppppppp', ...Array(32).fill(''), ...'PPPPPPPPRNBQKBNR'];
    let turn = 'w', ep = -1, half = 0, rights = 'KQkq'; const repetitions = new Map();
    const side = p => !p ? null : p === p.toUpperCase() ? 'w' : 'b';
    const other = s => s === 'w' ? 'b' : 'w';
    function attacked(b, index, by) {
        const r = index >> 3, c = index % 8;
        for (let i = 0; i < 64; i++) {
            if (side(b[i]) !== by) continue;
            const dr = r - (i >> 3), dc = c - i % 8, p = b[i].toLowerCase();
            if (p === 'p' && dr === (by === 'w' ? -1 : 1) && Math.abs(dc) === 1 || p === 'n' && Math.abs(dr) * Math.abs(dc) === 2 || p === 'k' && Math.max(Math.abs(dr), Math.abs(dc)) === 1) return true;
            if (!(p === 'q' && (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) || p === 'b' && Math.abs(dr) === Math.abs(dc) || p === 'r' && (dr === 0 || dc === 0))) continue;
            const sr = Math.sign(dr), sc = Math.sign(dc); let rr = (i >> 3) + sr, cc = i % 8 + sc, blocked = false;
            while (rr !== r || cc !== c) { if (b[rr * 8 + cc]) { blocked = true; break; } rr += sr; cc += sc; }
            if (!blocked) return true;
        }
        return false;
    }
    const checked = (b, s) => attacked(b, b.indexOf(s === 'w' ? 'K' : 'k'), other(s));
    function apply(b, from, to) {
        const copy = b.slice(), p = copy[from]; copy[to] = p; copy[from] = '';
        if (p.toLowerCase() === 'p' && to === ep && !b[to]) copy[to + (side(p) === 'w' ? 8 : -8)] = '';
        if (p.toLowerCase() === 'k' && Math.abs(to - from) === 2) { const rook = to > from ? from + 3 : from - 4, dest = to > from ? from + 1 : from - 1; copy[dest] = copy[rook]; copy[rook] = ''; }
        if (p.toLowerCase() === 'p' && (to < 8 || to > 55)) copy[to] = side(p) === 'w' ? 'Q' : 'q';
        return copy;
    }
    function moves(from, b = board, who = turn) {
        const p = b[from]; if (side(p) !== who) return [];
        const r = from >> 3, c = from % 8, type = p.toLowerCase(), out = [];
        const add = (rr, cc) => { if (rr < 0 || rr > 7 || cc < 0 || cc > 7 || side(b[rr * 8 + cc]) === who || b[rr * 8 + cc]?.toLowerCase() === 'k') return false; out.push(rr * 8 + cc); return !b[rr * 8 + cc]; };
        if (type === 'p') {
            const d = who === 'w' ? -1 : 1;
            if (r + d >= 0 && r + d <= 7 && !b[(r + d) * 8 + c]) { add(r + d, c); if (r === (who === 'w' ? 6 : 1) && !b[(r + 2 * d) * 8 + c]) add(r + 2 * d, c); }
            for (const dc of [-1, 1]) if (c + dc >= 0 && c + dc < 8 && r + d >= 0 && r + d < 8) { const i = (r + d) * 8 + c + dc; if (side(b[i]) === other(who) || i === ep) add(r + d, c + dc); }
        } else if (type === 'n') { for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) add(r + dr, c + dc); }
        else {
            const dirs = type === 'r' ? [[1,0],[-1,0],[0,1],[0,-1]] : type === 'b' ? [[1,1],[1,-1],[-1,1],[-1,-1]] : [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
            for (const [dr, dc] of dirs) for (let n = 1; n <= (type === 'k' ? 1 : 7); n++) if (!add(r + dr * n, c + dc * n)) break;
            if (type === 'k' && from === (who === 'w' ? 60 : 4) && !checked(b, who)) {
                for (const [right, delta, rook] of [[who === 'w' ? 'K' : 'k', 2, from + 3], [who === 'w' ? 'Q' : 'q', -2, from - 4]]) {
                    const dir = Math.sign(delta), path = delta > 0 ? [1,2] : [-1,-2,-3];
                    if (rights.includes(right) && b[rook] === (who === 'w' ? 'R' : 'r') && path.every(d => !b[from + d]) && !attacked(b, from + dir, other(who)) && !attacked(b, from + delta, other(who))) out.push(from + delta);
                }
            }
        }
        return out.filter(to => !checked(apply(b, from, to), who));
    }
    function all() { return board.flatMap((p, from) => side(p) === turn ? moves(from).map(to => ({ from, to })) : []); }
    function positionKey() { return board.join('.') + turn + rights + ep; }
    repetitions.set(positionKey(), 1);
    function move(from, to) {
        if (!moves(from).includes(to)) return false;
        const p = board[from], capture = Boolean(board[to]); const next = apply(board, from, to);
        half = p.toLowerCase() === 'p' || capture ? 0 : half + 1;
        ep = p.toLowerCase() === 'p' && Math.abs(to - from) === 16 ? (to + from) / 2 : -1;
        for (const [index, letters] of [[60,'KQ'],[4,'kq'],[63,'K'],[56,'Q'],[7,'k'],[0,'q']]) if (from === index || to === index) for (const ch of letters) rights = rights.replace(ch, '');
        board.splice(0, 64, ...next); turn = other(turn); const key = positionKey(); repetitions.set(key, (repetitions.get(key) || 0) + 1); return true;
    }
    function status() {
        const legal = all(); if (!legal.length) return checked(board, turn) ? `Skakmat · ${turn === 'w' ? 'hitam' : 'putih'} menang` : 'Remis · pat';
        const pieces = board.filter(Boolean).map(p => p.toLowerCase());
        if (half >= 100 || repetitions.get(positionKey()) >= 3 || pieces.length === 2 || pieces.length === 3 && (pieces.includes('b') || pieces.includes('n'))) return 'Remis';
        return `${turn === 'w' ? 'Putih' : 'Hitam'} jalan${checked(board, turn) ? ' · skak' : ''}`;
    }
    return { board, moves, move, all, status, turn: () => turn, finished: () => /Skakmat|Remis/.test(status()),
        bot() { if (turn !== 'b' || this.finished()) return; const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }; const options = all().map(m => ({ ...m, value: (values[board[m.to]?.toLowerCase()] || 0) * 10 + (3.5 - Math.abs(3.5 - m.to % 8)) + Math.random() * 2 })); options.sort((a, b) => b.value - a.value); if (options[0]) move(options[0].from, options[0].to); } };
}
