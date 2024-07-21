-- TODO: add mysql/mariadb table definitions
-- Create Boardgame table
CREATE TABLE IF NOT EXISTS Boardgame (
    boardgame_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- Create Session table
CREATE TABLE IF NOT EXISTS Session (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    boardgame_id INT,
    session_date DATE,
    session_time TIME,
    FOREIGN KEY (boardgame_id) REFERENCES Boardgame(boardgame_id)
);