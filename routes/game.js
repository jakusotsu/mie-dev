const indexModule = require('./index');
module.exports = {
	getAdd: (req, res) => {
		const boardgames = indexModule.getBoardgamesState();
		res.render('add-game.ejs', {
			title: 'Board Games | Add game',
			boardgames,
		});
	},
	getEdit: (req, res) => {
		const boardgameEditId = Number(req.params.id);
		const boardgame = indexModule.getBoardgamesState().find(game => Number(game.boardgame_id) === Number(boardgameEditId));
		res.render('edit-game.ejs', {
			title: 'Board Games | Edit game',
			boardgame,
		});
	},
	postAdd: (req, res) => {
		let newGame = req.body;
        if (newGame) {
            const query = `
    INSERT INTO Boardgame (boardgame_id, name, image)
    VALUES (?, ?, ?);
`;

            const values = [
                Number(newGame.boardgame_id),
                newGame.title,
                newGame.imageurl
            ];

            db.query(query, values, (err, result) => {
                if (err) {
					console.error('Error inserting new board game:', err);
					alert('Error inserting new board game:', err);
					res.redirect('/'); // Handle error appropriately
                }
                console.log('New board game added:', result);
            });
        }
		// TODO db.query to insert game

		// If all went well, go back to main screen
		res.redirect('/');
	},
	postEdit: (req, res) => {
		let deleteGame = req.params;

		if (deleteGame) {
			try {
				// Delete sessions associated with the boardgame
				db.query('DELETE FROM Session WHERE boardgame_id = ?', [Number(deleteGame.id)]);
				db.query('DELETE FROM Boardgame WHERE boardgame_id = ?', [Number(deleteGame.id)]);
			} catch (err) {
				console.error('Error executing query', err);
			}
		}
		// TODO db.query to update game

		res.redirect('/');
	}

};
