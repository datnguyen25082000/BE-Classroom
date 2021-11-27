-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: granding_system
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `assignment_category`
--

DROP DATABASE IF EXISTS `granding_system`;
CREATE DATABASE granding_system;
DROP TABLE IF EXISTS `assignment_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `course_id` int NOT NULL,
  `point` int NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `assignment_category_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_category`
--
USE granding_system;
LOCK TABLES `assignment_category` WRITE;
/*!40000 ALTER TABLE `assignment_category` DISABLE KEYS */;
INSERT INTO `assignment_category` VALUES (1,'Cuối kì',18,90,1),(2,'Giữa kì',18,20,2),(3,'Quá trình',18,20,0);
/*!40000 ALTER TABLE `assignment_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursejoin`
--

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
INSERT INTO `coursejoin` VALUES (17,6,2),(18,6,2),(19,6,2),(20,6,0),(20,9,2),(20,10,0),(20,11,1),(21,9,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (17,'Web nâng cao',6,'2021-11-23 21:22:26','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(18,'Lập trình window',6,'2021-11-23 21:22:33','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(19,'Phát triển ứng dụng di động',6,'2021-11-23 21:22:49','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(20,'Phát triển web nâng cao',9,'2021-11-24 20:28:24','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','ReactJS','Đào tạo ReactJS',''),(21,'Phát triển di động nâng cao',9,'2021-11-24 20:28:38','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,'');
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
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `type_user_name` (`user_type`,`user_username`),
  UNIQUE KEY `student_id` (`user_studentid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,0,'admin','Quản trị viên','$2b$10$vyVtRcQzpqsLNg8/auCtwO4ZQYqhJyrcFznfWJKNR0GsIe7xy08Uq',NULL,NULL,NULL,NULL,NULL,NULL),(7,1,'1130674984401221','Văn Đức',NULL,'duc@gmail.com',NULL,'0941123123','HCM','18120324','Duc'),(8,0,'test','Nguyễn Văn A','$2b$10$y7RHRPhlV8GVXfwuORmKR.5m6HyZSiT7pW5eQzw1enoz6K.ccft62',NULL,NULL,NULL,NULL,NULL,NULL),(9,0,'usertest1','Nguyễn Văn Tèo','$2b$10$/Dol1FDu/lXcIgSsTzqGSuPAQIRJY72OPyY0VaZupSv3A01Ko1r0K',NULL,NULL,NULL,NULL,NULL,NULL),(10,0,'test02','Trần Thị B','$2b$10$vQRU4mMyzTypXsHKM.ozquxiw0Nb3VDtLNabkQCS6G9EITbtGYmFy',NULL,NULL,NULL,NULL,NULL,NULL),(11,0,'testuser2','Lê Thị C','$2b$10$qxxTUYGRscf9J3jxbkBTf.8wl9iR2/SYmhTxusM5P8K.jQZDrjraS',NULL,NULL,NULL,NULL,NULL,NULL);
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

-- Dump completed on 2021-11-27 21:45:06
