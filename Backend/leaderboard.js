const Database = require('./database');
const db = new Database('./db.sqlite');

/*db.createTable("leaderboard", [
    { name: 'id', type: 'INTEGER', primaryKey: true, notNull: true },
    { name: 'name', type: 'TEXT', notNull: true },
    { name: 'score', type: 'INTEGER', default: 0 }
]);*/

db.execute(`CREATE TABLE IF NOT EXISTS 'leaderboard' (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, SCORE INTEGER NOT NULL);`);

async function getLeaderboard() {
    let data = await db.query(`SELECT name,score FROM leaderboard ORDER BY score DESC LIMIT 10;`);
    return data;
}

async function saveNewScore(name, score) {
    await db.execute(`INSERT INTO leaderboard (name,score) VALUES (${name},${score});`)
}

module.exports = {getLeaderboard, saveNewScore};