const indexModule = require('./index');
let boardgames = indexModule.boardgames;
module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game',
			boardgames,
		});
	},
	getEdit: (req, res) => {
		const gameId = req.params.id;
		const boardgame = boardgames.find(game => game.id === gameId);
		res.render('edit-game.ejs', {
			title: 'Board Games | Edit game',
			boardgame,
		});
	},
	postAdd: (req, res) => {
		let newGame = req.body;
		if (newGame) {
			let boardGameData = {
				name: newGame.title,
				id: newGame.boardgameid,
				image: newGame.imageurl
			}
			boardgames.push(boardGameData);
		}
		// TODO db.query to insert game

		// If all went well, go back to main screen
		res.redirect('/');
	},
	postEdit: (req, res) => {
		/*let id = req.params.id;*/
		console.log(req.params);
		console.log(req.body);
		let deleteGame = req.params;

		if (deleteGame) {
			indexModule.boardgames = indexModule.boardgames.filter((bg) => bg.id !== deleteGame.id);
		}
		// TODO db.query to update game

		res.redirect('/');
	},
	boardgames

};
