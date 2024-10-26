const sqlite3 = require('sqlite3');

class Database {
    constructor(dbFile) {
        this.db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
    }

    createTable(tableName, columns) {
        const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Table ${tableName} created.`);
                }
            });
        });
    }

    insert(tableName, columns, values) {
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Data inserted with ID: ${this.lastID}`);
                }
            });
        });
    }

    select(columns, table, whereStr) {
        const sql = `SELECT ${columns} FROM ${table} WHERE ${whereStr}`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Closed the database connection.');
            }
        });
    }
}

module.exports = Database;