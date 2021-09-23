const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

class Screenings {
    constructor(database) {
        this.database = database
        this.database.serialize(() => {
            this.database.run(`
            CREATE TABLE IF NOT EXISTS Screenings(
                id INTEGER PRIMARY KEY,
                movieID INTEGER FOREIGN KEY REFERENCES Movies(id),
                cinemaID INTEGER FOREIGN KEY REFERENCES Cinemas(id),
                screenNo INTEGER,
                startTime INTEGER
            )`);
        });
    }
    add(movie, cinema, screenNo, start) {
        this.database.serialize(() => {
            this.database.run(`
            INSERT INTO Screenings
            (movieID,cinemaID,screenNo, startTime)
            VALUES(
            (SELECT id FROM Movies WHERE name = (?)),
            (SELECT id FROM Cinemas WHERE location = (?)),
            (?),(?))
            `, [movie, cinema, screenNo, start]);
        });
    }
}