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
  `user_id` int NOT NULL,
  `user_role` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`course_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `coursejoin_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `coursejoin_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursejoin`
--

LOCK TABLES `coursejoin` WRITE;
/*!40000 ALTER TABLE `coursejoin` DISABLE KEYS */;
INSERT INTO `coursejoin` VALUES (9,1,2),(9,2,0),(10,2,2),(11,3,2),(12,1,2),(13,4,2),(16,1,2);
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
  `course_hostid` int NOT NULL,
  `course_createdate` datetime DEFAULT NULL,
  `course_thumbnail` varchar(100) DEFAULT NULL,
  `course_topic` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `course_des` varchar(150) DEFAULT NULL,
  `course_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `course_hostid` (`course_hostid`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`course_hostid`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (9,'Lớp học online',1,'2021-11-21 19:33:25','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','Hài hước','des','MTH10001'),(10,'Lớp của Đạt',2,'2021-11-21 21:07:22','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg',NULL,NULL,NULL),(11,'dat1',3,'2021-11-21 21:30:24','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg',NULL,NULL,NULL),(12,'dat11',1,'2021-11-21 22:08:53','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg',NULL,NULL,NULL),(13,'Khóa học lập trình',4,'2021-11-22 16:12:55','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg',NULL,NULL,NULL),(16,'Lớp học của Đạt',1,'2021-11-22 20:26:44','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','','','MTH11001');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_type` int NOT NULL,
  `user_username` varchar(30) NOT NULL,
  `user_displayname` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_email` varchar(35) DEFAULT NULL,
  `user_avatar` varchar(100) DEFAULT NULL,
  `user_phone` varchar(12) DEFAULT NULL,
  `user_address` varchar(100) DEFAULT NULL,
  `user_studentid` varchar(20) DEFAULT NULL,
  `user_nameinroom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,'datquadep','Nguyen Tan Dat 1','$2b$10$J8pZ1MEDjGdBbTvNVLVGnuVyjJFA8CdP0woHLlB9teUkl62OHB8jK','datnguyen25082000@gmail.com','http://localhost:5000/public/assets/avatar/1637567336460datquadepUSM1.png','0945483972','Viet Nam','18120308','18120308_NTD'),(2,0,'dat1','12','$2b$10$BDOtd44Z16nlHg55yNbqdueeoP.FT4h.BwQ6xBE91j0nIhAeCykRq',NULL,NULL,NULL,NULL,NULL,NULL),(3,0,'dat3','123','$2b$10$vzVNOQfE8PVotHcvDOjRS.H9PWyyHM0uz5xpa/Dmxif6pIbrga2y.',NULL,NULL,NULL,NULL,NULL,NULL),(4,1,'3108727689396978','Đạt Nguyêñ',NULL,NULL,'http://localhost:5000/public/assets/avatar/1637573215203108727689thuong.jpg',NULL,NULL,NULL,NULL),(5,1,'3108727689396978','Đạt Nguyêñ',NULL,NULL,'http://localhost:5000/public/assets/avatar/1637573215203108727689thuong.jpg',NULL,NULL,NULL,NULL);
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

-- Dump completed on 2021-11-22 21:51:58
