-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2023 at 05:27 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `img_product` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `img_product`) VALUES
(1, 'sari roti rasa coklat', 5500, 99, 'https://assets.klikindomaret.com/products/20035999/20035999_1.jpg'),
(2, 'sari roti rasa keju', 5500, 119, 'https://assets.klikindomaret.com/products/20025041/20025041_1.jpg'),
(3, 'sosis kanzler keju', 9500, 90, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//102/MTA-18423687/kanzler_kanzler_singles_keju_sosis_kanzler_single_cheese_65gr_full02_lw8wqcsl.jpg'),
(4, 'fanta orange', 13500, 50, 'https://images.tokopedia.net/img/cache/700/hDjmkQ/2022/12/6/8164bcd1-ec45-42f1-841c-7ce8043bd162.jpg'),
(5, 'sprite green', 11500, 77, 'https://assets.klikindomaret.com/products/20065779/20065779_1.jpg'),
(6, 'sprite oldgreen', 15500, 45, 'https://i.actva.cz/i/1/1/049/50049/600x600/63WwfC_600x600_20146e7277c81e74.jpg'),
(7, 'coca cola ori', 7500, 55, 'https://images.tokopedia.net/img/cache/700/hDjmkQ/2021/5/11/5f03447a-8822-4919-a788-ee888b993bee.jpg'),
(8, 'coca cola ori botol', 8500, 35, 'https://http2.mlstatic.com/D_NQ_NP_713920-MLU48307767189_112021-O.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `no_order` varchar(4) NOT NULL,
  `total_price` int(11) NOT NULL,
  `paid_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `no_order`, `total_price`, `paid_amount`) VALUES
(1, 'T740', 11000, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `no_order` varchar(4) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`id`, `id_product`, `no_order`, `quantity`) VALUES
(1, 1, 'T740', 1),
(2, 2, 'T740', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
