let boardgames = [];
let sessions = [];


function convertTo12Hour(time24) {
    let [hours, minutes] = time24.split(':');
    let modifier = 'AM';

    if (parseInt(hours, 10) >= 12) {
        modifier = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (hours === '00') {
        hours = '12';
    }

    return `${hours}:${minutes} ${modifier}`;
}

module.exports = {
    getHomePage: (req, res) => {
        // TODO: Make query for games list
        res.render('index.ejs', {
            title: 'Board Games | View Games',
            /*players: result,*/
            boardgames,
            sessions,
            convertTo12Hour
        });
        /*		let query = "SELECT 1 AS t";
        
                db.query(query, (err, result) => {
                    if (err) {
                        res.redirect('/');
                    }
                    res.render('index.ejs', {
                        title: 'Board Games | View Games',
                        players: result,
                    });
                });*/
    },
    boardgames,
    sessions
};
