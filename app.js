// app.js
// Main entry point for application

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser= require('body-parser');
const app = express();
const { getHomePage} = require('./routes/index');
const game = require('./routes/game');
const game_session = require('./routes/game_session');
const config = require('./config');
const port = config.app.port;
const db = mysql.createConnection(config.db);

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');
});

const createTables = async (db) => {
    try {

        db.query(`
            CREATE TABLE IF NOT EXISTS Boardgame (
                boardgame_id INT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL
            )
        `);

        db.query(`
            CREATE TABLE IF NOT EXISTS Session (
                session_id INT PRIMARY KEY AUTO_INCREMENT,
                boardgame_id INT,
                session_date DATE,
                session_time TIME,
                FOREIGN KEY (boardgame_id) REFERENCES Boardgame(boardgame_id)
            )
        `);
        console.log('Tables created successfully');

    } catch (err) {
        console.error('Error creating tables', err);
    }
};



createTables(db);

global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/add-game-session/:id', game_session.getAdd);
app.post('/add-game-session/:id', game_session.postAdd);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});

