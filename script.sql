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
USE granding_system;
DROP TABLE IF EXISTS `assignment_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `course_id` int NOT NULL,
  `point` int NOT NULL,
  `position` int NOT NULL,
  `isFinalized` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `assignment_category_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_category`
--

LOCK TABLES `assignment_category` WRITE;
/*!40000 ALTER TABLE `assignment_category` DISABLE KEYS */;
INSERT INTO `assignment_category` VALUES (1,'Cuối kì',18,25,1,0),(2,'Giữa kì',18,20,2,0),(3,'Quá trình',18,20,0,0),(5,'Test 2',18,20,4,0),(6,'Test 1',18,20,5,0),(7,'Giữa kì',17,100,0,1),(8,'Cuối kì',17,50,1,0),(9,'Cuối kì',22,100,0,0),(10,'Giữa kì',22,80,1,0),(11,'Cuối kì',19,100,0,1),(12,'Giữa kì',19,100,1,1);
/*!40000 ALTER TABLE `assignment_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_students`
--

DROP TABLE IF EXISTS `course_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(20) NOT NULL,
  `full_name` varchar(40) NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_students_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_students`
--

LOCK TABLES `course_students` WRITE;
/*!40000 ALTER TABLE `course_students` DISABLE KEYS */;
INSERT INTO `course_students` VALUES (13,'18120324','Nguyễn Văn A',18),(14,'18120333','Nguyễn Văn C',18),(15,'18120555','Trần Thị D',18),(16,'18120367','Đinh Văn Tèo',18),(17,'18120324','Nguyễn Văn A',17),(18,'18120333','Nguyễn Văn C',17),(19,'18120555','Trần Thị D',17),(20,'18120367','Đinh Văn Tèo',17),(21,'1712033','Trần Văn C',17),(22,'1712033','Trần Văn C',22),(23,'18120123','Lê Văn C',22),(24,'1712033','Trần Văn C',19),(25,'18120123','Lê Văn C',19),(26,'18120324','Nguyễn Văn A',19);
/*!40000 ALTER TABLE `course_students` ENABLE KEYS */;
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
INSERT INTO `coursejoin` VALUES (17,6,2),(18,6,2),(19,6,2),(19,20,0),(20,6,0),(20,9,2),(20,10,0),(20,11,1),(21,9,2),(22,6,0),(22,12,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (17,'Web nâng cao',6,'2021-11-23 21:22:26','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(18,'Lập trình window',6,'2021-11-23 21:22:33','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(19,'Phát triển ứng dụng di động',6,'2021-11-23 21:22:49','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(20,'Phát triển web nâng cao',9,'2021-11-24 20:28:24','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','ReactJS','Đào tạo ReactJS',''),(21,'Phát triển di động nâng cao',9,'2021-11-24 20:28:38','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,''),(22,'Test',12,'2021-12-20 14:20:01','https://ak.picdn.net/shutterstock/videos/19066813/thumb/12.jpg','',NULL,'');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL,
  `isReaded` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (4,6,'Sinh viên có mã số 18120324 đã tạo yêu cầu review cột điểm Giữa kì của khóa học Phát triển ứng dụng di động','2022-01-14 06:22:51',0),(5,20,'Giáo viên Quản trị viên đã bình luận về yêu cầu sửa điểm của bạn.','2022-01-15 07:03:12',0),(6,20,'Cột điểm Giữa kì của lớp có mã số 17 đã được công bố','2022-01-15 08:34:21',0),(7,20,'Giáo viên Quản trị viên đã bình luận về yêu cầu sửa điểm của bạn.','2022-01-16 06:18:45',0),(8,20,'Giáo viên Quản trị viên đã hoàn tất yêu cầu sửa điểm của bạn','2022-01-16 06:39:46',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assignment_category_id` int NOT NULL,
  `point` float DEFAULT NULL,
  `course_student_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assignment_category_id` (`assignment_category_id`),
  KEY `course_student_id` (`course_student_id`),
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`assignment_category_id`) REFERENCES `assignment_category` (`id`),
  CONSTRAINT `score_ibfk_3` FOREIGN KEY (`course_student_id`) REFERENCES `course_students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (35,3,10,13),(36,10,80,22),(37,9,100,22),(38,10,110,23),(39,9,90,23),(44,11,NULL,24),(45,12,200,24),(46,11,NULL,25),(47,12,50,25),(48,11,80,26),(49,12,100,26);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score_review`
--

DROP TABLE IF EXISTS `score_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `score_id` int NOT NULL,
  `expected_point` float NOT NULL,
  `reason` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isFinalized` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `score_id` (`score_id`),
  CONSTRAINT `score_review_ibfk_1` FOREIGN KEY (`score_id`) REFERENCES `score` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_review`
--

LOCK TABLES `score_review` WRITE;
/*!40000 ALTER TABLE `score_review` DISABLE KEYS */;
INSERT INTO `score_review` VALUES (6,49,90,'điểm thấp quá thầy ơi',1);
/*!40000 ALTER TABLE `score_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score_review_comment`
--

DROP TABLE IF EXISTS `score_review_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_review_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `score_review_id` int NOT NULL,
  `created_by` int NOT NULL,
  `created_at` datetime NOT NULL,
  `content` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `score_review_id` (`score_review_id`),
  CONSTRAINT `score_review_comment_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`),
  CONSTRAINT `score_review_comment_ibfk_2` FOREIGN KEY (`score_review_id`) REFERENCES `score_review` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_review_comment`
--

LOCK TABLES `score_review_comment` WRITE;
/*!40000 ALTER TABLE `score_review_comment` DISABLE KEYS */;
INSERT INTO `score_review_comment` VALUES (1,6,6,'2022-01-15 06:23:44','Bài này em làm đúng mà'),(2,6,6,'2022-01-15 06:23:57','Bài này em làm đúng mà'),(3,6,6,'2022-01-15 06:24:42','Bài này em làm đúng mà'),(4,6,6,'2022-01-15 06:25:05','Bài này em làm đúng mà'),(5,6,6,'2022-01-15 06:41:28','Bài này em làm đúng mà'),(6,6,6,'2022-01-15 06:41:31','Bài này em làm đúng mà'),(7,6,6,'2022-01-15 06:53:32','Bài này em làm đúng mà'),(8,6,6,'2022-01-15 06:53:54','Bài này em làm đúng mà'),(9,6,6,'2022-01-15 06:55:33','Bài này em làm đúng mà'),(10,6,6,'2022-01-15 06:57:45','Bài này em làm đúng mà'),(11,6,6,'2022-01-15 06:58:11','Bài này em làm đúng mà'),(12,6,6,'2022-01-15 06:59:38','Bài này em làm đúng mà'),(13,6,6,'2022-01-15 07:01:05','Bài này em làm đúng mà'),(14,6,6,'2022-01-15 07:01:31','Bài này em làm đúng mà'),(15,6,6,'2022-01-15 07:01:58','Bài này em làm đúng mà'),(16,6,6,'2022-01-15 07:02:35','Bài này em làm đúng mà'),(17,6,6,'2022-01-15 07:03:12','Bài này em làm đúng mà'),(18,6,6,'2022-01-16 06:18:45','Thầy xem sớm giúp em');
/*!40000 ALTER TABLE `score_review_comment` ENABLE KEYS */;
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
  `user_is_active` int NOT NULL DEFAULT '0',
  `user_otp` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `type_user_name` (`user_type`,`user_username`),
  UNIQUE KEY `student_id` (`user_studentid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,0,'admin','Quản trị viên','$2b$10$vyVtRcQzpqsLNg8/auCtwO4ZQYqhJyrcFznfWJKNR0GsIe7xy08Uq','',NULL,'','','18120123','',1,NULL),(8,0,'test','Nguyễn Văn A','$2b$10$y7RHRPhlV8GVXfwuORmKR.5m6HyZSiT7pW5eQzw1enoz6K.ccft62',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(9,0,'usertest1','Nguyễn Văn Tèo','$2b$10$/Dol1FDu/lXcIgSsTzqGSuPAQIRJY72OPyY0VaZupSv3A01Ko1r0K',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(10,0,'test02','Trần Thị B','$2b$10$vQRU4mMyzTypXsHKM.ozquxiw0Nb3VDtLNabkQCS6G9EITbtGYmFy',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(11,0,'testuser2','Lê Thị C','$2b$10$qxxTUYGRscf9J3jxbkBTf.8wl9iR2/SYmhTxusM5P8K.jQZDrjraS',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(12,0,'hellovanduc','Đức','$2b$10$WFSMbrBaG8/tQUdvbZun1uoFlfb2qfCKzQvBFAX99iPknbSv.r7Mq',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(20,0,'testactivateuserbyemail','Nguyễn Văn A','$2b$10$6cMKj2HtLYKUWniZrFSHsuPKSKereeFF35QdvW7gBrb6fklvpBvOG','nguyenduc21022k@gmail.com',NULL,'','','18120324','',1,NULL);
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

-- Dump completed on 2022-01-16  6:43:40
