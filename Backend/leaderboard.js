const Database = require('./database');
const db = new Database('./db.sqlite');

/*db.createTable("leaderboard", [
    { name: 'id', type: 'INTEGER', primaryKey: true, notNull: true },
    { name: 'name', type: 'TEXT', notNull: true },
    { name: 'score', type: 'INTEGER', default: 0 }
]);*/

db.execute(`CREATE TABLE IF NOT EXISTS 'leaderboard' (name TEXT PRIMARY KEY, SCORE INTEGER NOT NULL);`);

async function getLeaderboard() {
    let data = await db.query(`SELECT name,score FROM leaderboard ORDER BY score DESC LIMIT 10;`);
    return data;
}

async function saveNewScore(name, score) {
    let old_score_q = await db.query(`SELECT score FROM leaderboard WHERE name='${name}'`);
    if (old_score_q.length==0) {
        console.log('first score');
        db.execute(`INSERT INTO leaderboard (name,score) VALUES ('${name}',${score});`);
    } else {
        let old_score=old_score_q[0]['SCORE'];
        if (score > old_score) {
            console.log(`score is higher ${score} > ${old_score}`);
            db.execute(`UPDATE leaderboard SET score = '${score}' WHERE name = '${name}';`);
        } else {
            console.log(`score is lower ${score} < ${old_score}`);
        }
    }
}

module.exports = {getLeaderboard, saveNewScore};