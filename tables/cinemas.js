const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data.db");

class Cinemas {
    constructor(database) {
        this.database = database
        this.database.serialize(() => {
            this.database.run(`
            CREATE TABLE IF NOT EXISTS Cinemas(
                id INTEGER PRIMARY KEY,
                location VARCHAR(255)
            )`);
        });
    }
    add(location) {
        this.database.serialize(() => {
            this.database.run(`
            INSERT INTO Cinemas(location)
            VALUES ((?))`, [location]);
        });
    }
    getID(location) {
        this.database.serialize(() => {
            this.database.get(`
            SELECT id FROM Cinemas WHERE location = (?)`,
                [location], (err, rows) => {
                    if (err) {
                        throw err;
                    };
                    return rows;
                });
        })
    }
}

module.exports = Cinemas;