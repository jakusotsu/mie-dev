let boardgames = [];
let sessions = [];

function setBoardgamesState(newBoardgames) {
    boardgames = newBoardgames;
}

function getBoardgamesState() {
    return boardgames;
}

function setSessionsState(newSessions) {
    sessions = newSessions;
}

function getSessionsState() {
    return sessions;
}
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
// Function to format a SQL date string by stripping the time part
function formatSQLDate(sqlDate) {
    // Create a Date object from the SQL date string
    const date = new Date(sqlDate);

    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date in YYYY-MM-DD format
    return `${month}-${day}-${year}`;
}

const getBoardgames = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Boardgame", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getSessions = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT boardgame_id, DATE(session_date) as session_date, session_time FROM Session ORDER BY session_date DESC, session_time DESC;", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const renderPage = async (req, res) => {
    try {
        const [boardgamesResult, sessionsResult] = await Promise.all([getBoardgames(), getSessions()]);

        setBoardgamesState(boardgamesResult.map(result => ({ ...result })));
        setSessionsState(sessionsResult.map(result => ({ ...result })));

        res.render('index.ejs', {
            title: 'Board Games | View Games',
            boardgames,
            sessions,
            convertTo12Hour,
            formatSQLDate
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

module.exports = {
    getHomePage: (req, res) => {
        // TODO: Make query for games list
        renderPage(req, res);
    },
    boardgames,
    sessions,
    getBoardgamesState,
    getSessionsState
};
