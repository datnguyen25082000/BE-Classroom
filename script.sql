-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: granding_system
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coursejoin`
--

DROP DATABASE IF EXISTS `granding_system`;
CREATE DATABASE granding_system;

USE granding_system;

DROP TABLE IF EXISTS `coursejoin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursejoin` (
  `course_id` int NOT NULL,
  `user_username` varchar(30) NOT NULL,
  PRIMARY KEY (`course_id`,`user_username`),
  KEY `user_username` (`user_username`),
  CONSTRAINT `coursejoin_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `coursejoin_ibfk_2` FOREIGN KEY (`user_username`) REFERENCES `users` (`user_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursejoin`
--

LOCK TABLES `coursejoin` WRITE;
/*!40000 ALTER TABLE `coursejoin` DISABLE KEYS */;
/*!40000 ALTER TABLE `coursejoin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `course_hostid` varchar(30) NOT NULL,
  `course_createdate` datetime DEFAULT NULL,
  `course_thumbnail` varchar(100) DEFAULT NULL,
  `course_topic` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `course_hostid` (`course_hostid`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`course_hostid`) REFERENCES `users` (`user_username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Khởi nghiệp','admin','2021-10-23 00:00:00','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(2,'Lớp học online 1','admin','2021-10-23 00:00:00','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(3,'Lớp học 2','admin','2021-10-23 00:00:00','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(4,'Khóa học kỹ năng','admin','2021-10-23 00:00:00','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(5,'Khóa học 5','admin','2021-10-23 19:19:14','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(6,'Khóa học lập trình','admin','2021-10-23 21:54:13','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(7,'Khóa học lập trình','admin','2021-10-24 15:33:20','https://avatar.nl/wp-content/uploads/2020/12/WebEventAvatarfeb.png',NULL),(8,'Lớp học online 1','admin','2021-10-26 21:15:58','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg',NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_username` varchar(30) NOT NULL,
  `user_displayname` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_email` varchar(35) DEFAULT NULL,
  `user_avatar` varchar(100) DEFAULT NULL,
  `user_phone` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`user_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','Nguyễn Tấn Đạt','123123',NULL,NULL,NULL),('datquadep',NULL,'123123',NULL,NULL,NULL),('datquadep1','Nguyễn Tấn Đạt','123123',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-01 15:20:17
