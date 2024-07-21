# TODO: add mysql/mariadb table definitions
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


# TODO: add sample data
-- Insert sample data into Boardgame table
INSERT INTO Boardgame (boardgame_id, name, image) VALUES (397598, 'Dune: Imperium – Uprising', 'https://cf.geekdo-images.com/UVUkjMV_Q2paVUIUP30Vvw__original/img/BoUtCkd1NRO0bR1R5EwL51xIuXA=/0x0/filters:format(jpeg)/pic7664424.jpg');


-- Insert sample data into Session table
INSERT INTO Session (boardgame_id, session_date, session_time) VALUES (397598, '2024-07-21', '18:30:00');

