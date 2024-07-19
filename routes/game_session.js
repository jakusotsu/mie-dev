const indexModule = require('./index');
let sessions = indexModule.sessions;
let boardgames = indexModule.boardgames;
module.exports = {
	getAdd: (req, res) => {
		const gameId = req.params.id;
		const boardgame = boardgames.find(game => game.id === gameId);
		res.render('add-game-session.ejs', {
			title: 'Board Games | Add Game Session',
			boardgame,
			sessions
		});
	},
	postAdd: (req, res) => {
		console.log(req.body);
		let newSession = req.body;
		if (newSession) {
			let sessionData = {
				id: newSession.boardgameid,
				session_date: newSession.session_date
			}
			sessions.push(sessionData);
		}
		// TODO db.query to insert game-playing session

		res.redirect('/');
	}
};
