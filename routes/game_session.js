const indexModule = require('./index');
let sessions = indexModule.sessions;
module.exports = {
	getAdd: (req, res) => {
		const gameId = req.params.id;
        const boardgame = indexModule.getBoardgamesState().find(game => game.boardgame_id === Number(gameId));
		res.render('add-game-session.ejs', {
			title: 'Board Games | Add Game Session',
			boardgame,
			sessions
		});
	},
    postAdd: (req, res) => {
        let newSession = req.body;
        if (newSession) {
            const query = `
        INSERT INTO Session (boardgame_id, session_date, session_time)
        VALUES (?, ?, ?)
    `;
            const values = [newSession.boardgame_id, newSession.session_date, newSession.session_time];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error inserting new session:', err);
                    callback(err); // Pass the error to the callback
                }
            });
        }
        // TODO db.query to insert game-playing session

        res.redirect('/');
    }
};
