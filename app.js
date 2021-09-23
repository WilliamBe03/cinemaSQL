const sqlite3 = require("sqlite3").verbose();
const Cinemas = require("./tables/cinemas");
const Movies = require("./tables/movies");
const Screenings = require("./tables/screenings")

const db = new sqlite3.Database("data.db");

const Cinema = new Cinemas(db);
const Movie = new Movies(db);
const Screening = new Screenings(db);

Cinema.add("London");
Cinema.add("Manchester");

Movie.add("G-Force", 210);
Movie.add("Turbo", 133);

Screening.add("Turbo", "London", 3, 10);
Screening.add("Turbo", "Manchester", 2, 9);
Screening.add("G-Force", "Manchester", 11, 3);

db.close();