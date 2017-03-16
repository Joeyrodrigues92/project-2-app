
CREATE DATABASE trivias_db;
USE trivias_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE trivias
-- change t to scores instead trivias
(
	id int NOT NULL AUTO_INCREMENT,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	score int default 0,
	correct int default 0,
	incorrect int default 0,
	user_id INT NOT NULL, 
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) references users(id)

);

-- for advance quiz
	-- catergory_name varchar(255) NOT NULL,
	-- difficulty varchar(255) NOT NULL,

-- CREATE TABLE user_status
-- (
-- 	user_id int NOT NULL, 
-- 	trivia_id int NOT NULL, 
-- 	FOREIGN KEY (user_id) references users(id),
-- 	FOREIGN KEY (trivia_id) references trivias(id)
-- );