const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data.db");

class Movies {
    constructor(database) {
        this.database = database
        this.database.serialize(() => {
            this.database.run(`
            CREATE TABLE IF NOT EXISTS Movies(
                id INTEGER PRIMARY KEY,
                name VARCHAR(255),
                duration INTEGER
            )`);
        });
    }
    add(name, duration) {
        this.database.serialize(() => {
            this.database.run(`
            INSERT INTO Movies(name, duration)
            VALUES ((?),(?))`,
                [name, duration]);
        });
    }
    getID(name) {
        db.get(`
        SELECT id FROM Movies WHERE name = (?)`,
            [name], (err, rows) => {
                if (err) {
                    throw err;
                };
                return rows;
            });
    }

}

module.exports = Movies;