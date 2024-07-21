--
-- Table structure for table `Boardgame`
--
DROP TABLE IF EXISTS `Session`;
DROP TABLE IF EXISTS `Boardgame`;

CREATE TABLE `Boardgame` (
  `boardgame_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`boardgame_id`)
);

--
-- Dumping data for table `Boardgame`
--

LOCK TABLES `Boardgame` WRITE;
INSERT INTO `Boardgame` VALUES
(92932,'Race for the Galaxy: Alien Artifacts','https://cf.geekdo-images.com/XMLKG9ZCbjHArCpE3MjHEg__original/img/7arBQ4SVSm7nCFe8FmmfcXyXKoY=/0x0/filters:format(jpeg)/pic1839311.jpg'),
(232414,'Oceans','https://cf.geekdo-images.com/1J7_qmdohyypZNyvu8B45A__original/img/N4cHTwdthImTVqNrJUN9jQDskRc=/0x0/filters:format(jpeg)/pic4382323.jpg'),
(233896,'Resident Evil 2: The Board Game','https://cf.geekdo-images.com/3571tuSDcDnaT1a6AQTUQQ__original/img/khPq8NK3OtnegPJbppzY7PJPabw=/0x0/filters:format(jpeg)/pic3742353.jpg'),
(285774,'Marvel Champions: The Card Game','https://cf.geekdo-images.com/kRvUgYiaOq07kC67ZK5UoQ__original/img/cqng0e4S7Cj6j6Sb49-OCggGi-8=/0x0/filters:format(jpeg)/pic4900321.jpg'),
(397598,'Dune: Imperium \- Uprising','https://cf.geekdo-images.com/UVUkjMV_Q2paVUIUP30Vvw__original/img/BoUtCkd1NRO0bR1R5EwL51xIuXA=/0x0/filters:format(jpeg)/pic7664424.jpg');
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

CREATE TABLE `Session` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `boardgame_id` int(11) DEFAULT NULL,
  `session_date` date DEFAULT NULL,
  `session_time` time DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `boardgame_id` (`boardgame_id`),
  CONSTRAINT `Session_ibfk_1` FOREIGN KEY (`boardgame_id`) REFERENCES `Boardgame` (`boardgame_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
INSERT INTO `Session` VALUES
(17,92932,'2024-07-13','16:30:00'),
(18,232414,'2024-07-13','17:30:00'),
(19,397598,'2024-07-20','17:30:00'),
(20,285774,'2024-07-20','19:30:00');
UNLOCK TABLES;

