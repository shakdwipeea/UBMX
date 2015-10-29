-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 29, 2015 at 06:56 PM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ubmk`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE IF NOT EXISTS `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(0, 'admin', '$2a$10$gwyHI613OE7k5SLs2ABb9ungZclAF1ppu/klJ6eoq5cF29sebdSWK'),
(1, 'admin', '$2a$10$EGw14njYeCtvp5wuU4WVge/07IIjj452FBuV1az9D86l1rKqvZlWy');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `problem_id` int(11) DEFAULT NULL,
  `slot_id` int(11) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `type_id`, `vendor_id`, `user_id`, `status`, `problem_id`, `slot_id`, `feedback`, `rating`) VALUES
(1, 1, 1, 807256, 'done', 1, 1, 'dedede', '5'),
(2, 2, 2, 807256, 'dqwdewqdew', 2, 1, 'dewdwq', '2');

-- --------------------------------------------------------

--
-- Table structure for table `booking_type`
--

CREATE TABLE IF NOT EXISTS `booking_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking_type`
--

INSERT INTO `booking_type` (`id`, `name`) VALUES
(1, 'type1'),
(2, 'type2'),
(607269, 'Type 3');

-- --------------------------------------------------------

--
-- Table structure for table `booking_type_vendor`
--

CREATE TABLE IF NOT EXISTS `booking_type_vendor` (
  `id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking_type_vendor`
--

INSERT INTO `booking_type_vendor` (`id`, `type_id`, `vendor_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(607839, 607269, 654869),
(624333, 607269, 754680),
(847433, 2, 654869),
(898535, 1, 754680),
(998682, 2, 754680);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `name`, `run_on`) VALUES
(1, '/20150913063605-boilerplate', '2015-09-28 17:20:42'),
(2, '/20150913131504-add-password-user', '2015-09-28 17:20:43'),
(3, '/20150915062104-vendor-email-password', '2015-09-28 17:20:47'),
(4, '/20150915143802-admin-table', '2015-09-28 17:20:48'),
(5, '/20150916064331-user-vendor-auto-increment', '2015-09-28 17:20:48'),
(6, '/20151018103958-add-location', '2015-10-25 00:03:23'),
(7, '/20151021095124-add-lat-lng-vendor', '2015-10-25 00:03:23');

-- --------------------------------------------------------

--
-- Table structure for table `problem`
--

CREATE TABLE IF NOT EXISTS `problem` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `problem`
--

INSERT INTO `problem` (`id`, `name`) VALUES
(1, 'problem 1'),
(2, 'problem 2');

-- --------------------------------------------------------

--
-- Table structure for table `problem_vendor`
--

CREATE TABLE IF NOT EXISTS `problem_vendor` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `problem_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `problem_vendor`
--

INSERT INTO `problem_vendor` (`id`, `vendor_id`, `problem_id`) VALUES
(1, 1, 1),
(715709, 654869, 2),
(869445, 754680, 1),
(927475, 654869, 1),
(954237, 754680, 2);

-- --------------------------------------------------------

--
-- Table structure for table `slot`
--

CREATE TABLE IF NOT EXISTS `slot` (
  `id` int(11) NOT NULL,
  `timing` varchar(255) DEFAULT NULL,
  `booking_done` int(11) DEFAULT NULL,
  `booking_limit` int(11) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slot`
--

INSERT INTO `slot` (`id`, `timing`, `booking_done`, `booking_limit`, `date`, `vendor_id`) VALUES
(1, '1200-1300', 1, 50, '12 aug', 1),
(502617, '1300-1400', 1, 10, '2015-10-13T17:45:26.192Z', 654869),
(527256, '1200-1300', 1, 10, '2015-10-25T18:45:25.260Z', 654869),
(528526, '1300-1400', 1, 10, '2015-10-27T17:43:04.839Z', 654869),
(570238, '1300-1400', 1, 10, '2015-10-14T17:37:49.836Z', 654869),
(744260, '1300-1400', 1, 10, '2015-10-19T18:35:57.659Z', 654869),
(826748, '1300-1400', 1, 10, '2015-10-25T18:35:57.659Z', 654869),
(834078, '1300-1400', 1, 10, '2015-10-25T18:38:44.114Z', 654869),
(901976, '1200-1300', 1, 10, '2015-10-13T17:45:26.192Z', 654869);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`) VALUES
(807256, 'Ragahbe', 'ashakdwipeea@gmail.com', NULL, '$2a$10$2/LY2uRAmX/HLfy197/jHeD.Di5BIk3IoCfsOCNDDk3B.hJP2seOm'),
(839411, 'Vaishak', 'vaishak.ashwa@gmail.com', '9900211221', '$2a$10$iEl7v5uSZsr7HhLQosjWsuCWM4xqEBsdyZABr99M92gVYBXcdMALm'),
(905400, 'vaishak.prashanth@gmail.com', 'vaishak.prashanth@gmail.com', 'lollollol', '$2a$10$aS7cu7JYBj7s6zt2bz4rjujTflvlkZwxer1wJilN61awgmg5C9NHe');

-- --------------------------------------------------------

--
-- Table structure for table `user_vehicle`
--

CREATE TABLE IF NOT EXISTS `user_vehicle` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `name`, `brand`) VALUES
(1, 'Vehicle 1', 'brand1'),
(2, 'vehicle 2', 'brand 2'),
(602977, 'Pulsar 220', 'Bajaj'),
(754442, 'Pulsar 220', 'Bajaj');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE IF NOT EXISTS `vendor` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `capacity_per_slot` int(11) DEFAULT NULL,
  `timings` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `name`, `capacity_per_slot`, `timings`, `email`, `password`, `location`, `lat`, `lng`) VALUES
(1, 'vendor 1', 25, '1000-2100', 'email@vendor1.com', 'hehaha', '', NULL, NULL),
(2, 'vendor 2', 30, '1000-2200', 'email@vendor2.com', 'hahaha', '', NULL, NULL),
(654869, 'Vaisak', 10, '1200-1400', 'va@vasfd.adfs', '$2a$10$bBSEkWyekCdDgC41ffDMeeUlqgLHEJ9OkhA5MFSV40RtGwUvjVWeG', 'Rajaji', '12.9250188', '77.5154368'),
(754680, 'Test2', 10, '1000-1800', 'vas@gasdf.asdf', '$2a$10$GhyW5fRk7VMQtjceCBKUKOS1HlGW3ofiYLrTRm1qCzrmOPpGjc24W', 'Rajarajeshwari Nagar', '12.9254555', '77.517122');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_vendor_id_fk` (`vendor_id`),
  ADD KEY `address_user_id_fk` (`user_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_slot_id_fk` (`slot_id`),
  ADD KEY `booking_problem_id_fk` (`problem_id`),
  ADD KEY `booking_user_id_fk` (`user_id`),
  ADD KEY `booking_vendor_id_fk` (`vendor_id`),
  ADD KEY `booking_type_id_fk` (`type_id`);

--
-- Indexes for table `booking_type`
--
ALTER TABLE `booking_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_type_vendor`
--
ALTER TABLE `booking_type_vendor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_type_vendor_vendor_id_fk` (`vendor_id`),
  ADD KEY `booking_type_vendor_booking_type_id_fk` (`type_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `problem`
--
ALTER TABLE `problem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `problem_vendor`
--
ALTER TABLE `problem_vendor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `problem_vendor_problem_id_fk` (`problem_id`),
  ADD KEY `problem_vendor_vendor_id_fk` (`vendor_id`);

--
-- Indexes for table `slot`
--
ALTER TABLE `slot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slot_vendor_id_fk` (`vendor_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_vehicle`
--
ALTER TABLE `user_vehicle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_vehicle_vehicle_id_fk` (`vehicle_id`),
  ADD KEY `user_vehicle_user_id_fk` (`user_id`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `address_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_problem_id_fk` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_slot_id_fk` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_type_id_fk` FOREIGN KEY (`type_id`) REFERENCES `booking_type` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_type_vendor`
--
ALTER TABLE `booking_type_vendor`
  ADD CONSTRAINT `booking_type_vendor_booking_type_id_fk` FOREIGN KEY (`type_id`) REFERENCES `booking_type` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_type_vendor_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `problem_vendor`
--
ALTER TABLE `problem_vendor`
  ADD CONSTRAINT `problem_vendor_problem_id_fk` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `problem_vendor_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `slot`
--
ALTER TABLE `slot`
  ADD CONSTRAINT `slot_vendor_id_fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_vehicle`
--
ALTER TABLE `user_vehicle`
  ADD CONSTRAINT `user_vehicle_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_vehicle_vehicle_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
