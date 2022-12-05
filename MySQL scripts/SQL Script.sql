-- CREATE DATABASE `Realtime_chatapp`;







USE realtime_chatapp;







/*
CREATE TABLE `person` (
	id          INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    firstname   NVARCHAR(25) NOT NULL,
	lastname    NVARCHAR(25),
    username    NVARCHAR(25) UNIQUE NOT NULL,
	email       NVARCHAR(200) UNIQUE NOT NULL,
    photo       NVARCHAR(200),
    password    NVARCHAR(200) NOT NULL,
    bio         NVARCHAR(150),
    website     NVARCHAR(150),
    gender      NVARCHAR(6) NOT NULL,
    age         INT CHECK(age >= 18),
    phone       NVARCHAR(16) NOT NULL UNIQUE,
    user_clicked   INT DEFAULT(0),
    status      NVARCHAR(8) NOT NULL DEFAULT('offline'),
    date_of_birth  DATE
);
*/







-- CREATE TABLE `chat` (
-- 	id         INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
--     `from`     INT,
--     `to`       INT,
--     `time`     NVARCHAR(22) DEFAULT(NOW()),
-- 	`status`   INT DEFAULT(0),
--     text       NVARCHAR(900) NOT NULL 
-- );







-- CREATE TABLE `blockk` (
-- 	id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
--     user_id INT,
--     user_id_blocked INT
-- );







-- CREATE TABLE `removeChatOneUser` (
-- 	id INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
--     user_id INT,
--     user_id_removeChat INT,
--     date NVARCHAR(22)
-- );







/*
INSERT INTO person (firstname, lastname, username, email, password, bio, gender, age, phone, date_of_birth) VALUES 
('Ali', 'Naserian', 'ali214', 'ali@gmail.com', '5210', 'I am nurse', 'male', 26, '04513697156', '2002-02-01'),
('Hosein', 'Haghani', 'hosein478', 'hosein@gmail.com', '6317', 'I am plumer', 'male', 33, '01369874268', '2008-11-24'),
('Iman', 'Omidian', 'iman482', 'iman@gmail.com', '85641', 'I am software enginere', 'male', 30, '07451369753', '2004-04-12'),
('Reza', 'Asadi', 'reza145', 'reza14@gmail.com', '5123', 'I am carpenter', 'male', 32, '03147893458', '2009-04-10'),
('Mohamad', 'Asadolahi', 'mohamad630', 'mohamad201@gmail.com', '2846', 'I am sweeper', 'male', 31, '03124589637', '2008-04-05');
*/







-- SELECT * FROM person;







-- > Send Message
-- INSERT INTO chat (`from`, `to`, `status`, `text`) VALUES (5, 4, 0, 'سلام تازه رسیدم باشگاه');







-- > All User
-- SELECT * FROM person;







-- > Peida kardane user hai ke mesalan user 1 bahashun chat karde ya kasai ke be user 1 
-- > user hai ke ba anha chat darim
-- SELECT * FROM person p WHERE p.id IN (SELECT DISTINCT c.to FROM chat c WHERE c.from = 1)
-- UNION
-- SELECT * FROM person p WHERE p.id IN (SELECT DISTINCT c.from FROM chat c WHERE c.to = 1);


-- > Hame chat haye useri ke id 1 dare -- scripts haye zir bar axe balai amal mikone
-- SELECT * FROM chat c WHERE c.to IN (SELECT p.id FROM person p WHERE p.id = 1)
-- UNION
-- SELECT * FROM chat c WHERE c.from IN (SELECT p.id FROM person p WHERE p.id = 1);







-- > Chats Two User
-- SELECT * FROM chat c WHERE c.from = 1 AND c.to = 2 UNION ALL SELECT * FROM chat c WHERE c.from = 2  AND c.to = 1 ORDER BY time;
-- SELECT * FROM chat c WHERE c.from = 1 AND c.to = 2 UNION SELECT * FROM chat cc WHERE cc.from = 2 AND cc.to = 1 ORDER BY `time`;
-- SELECT * FROM chat c WHERE c.from IN (4, 3) AND c.to IN(4, 3) ORDER BY `time`;
-- SELECT * FROM chat c WHERE c.from IN (1, 4) AND c.to IN(1, 4) AND c.from = 4 ORDER BY `time`;
-- SELECT * FROM chat c WHERE c.from IN (1, 4) AND c.to IN(1, 4) AND c.from = 4 AND c.status = 0 ORDER BY `time`;







-- > Update
-- UPDATE chat c SET c.status = 1 WHERE id IN (2, 4);
-- UPDATE person SET user_clicked = 0, `status` = 0 WHERE id = 2;







-- > COUNT of messages sent to the user 1 that their status is 0
-- SELECT c.from, c.to, COUNT(c.status) AS CountMsgNotRead FROM chat c WHERE c.status = 0 GROUP BY c.from HAVING c.from != 2 AND c.to = 2;







-- block kardan yek user
-- INSERT INTO `blockk` (user_id, user_id_blocked) VALUES (4, 2), (1, 4);







-- > User hai ke user 1 block karde ya user 1 ra block kardan
-- SELECT * FROM blockk b WHERE b.user_id = 4 UNION SELECT * FROM blockk b WHERE b.user_id_blocked = 4;
-- SELECT * FROM blockk WHERE user_id = 4 OR user_id_blocked = 4;







-- > unblock kardan yek user
-- DELETE FROM blockk WHERE id = 27;







-- > Vaghti karbar mesalan 1 be karbar 2 payam mide bayad dar table removeChatOneUser belafasele sabt beshe

/* DELIMITER $$
CREATE TRIGGER insert_to_removeChatOneUser
  AFTER INSERT ON chat
  FOR EACH ROW 
BEGIN
    IF NOT EXISTS
        (SELECT * FROM removeChatOneUser WHERE user_id = NEW.from AND user_id_removeChat = NEW.to)
        THEN
            INSERT INTO removeChatOneUser VALUES (DEFAULT, NEW.from, NEW.to, DATE_SUB(NOW(), INTERVAL '1' HOUR));
		END IF;
END $$
DELIMITER ; */ 

-- INSERT INTO chat (`from`, `to`, `status`, `text`) VALUES (4, 3, 1, 'سلام');







-- > Update date in removeChatOneUser
-- UPDATE removeChatOneUser SET `date` = NOW() WHERE id = (SELECT id FROM (SELECT id FROM removeChatOneUser WHERE user_id = 1 AND user_id_removeChat = 3) AS id);







-- > namayesh payam haye user 1 ba user 3 az yek tarikhi bebad ke user 1 chat hara remove karde
-- SELECT * FROM chat c WHERE c.from IN (1, 3) AND c.to IN (1, 3) AND c.time > (SELECT `date` FROM `removeChatOneUser` WHERE user_id = 1 AND user_id_removeChat = 3) ORDER BY c.time ASC;



