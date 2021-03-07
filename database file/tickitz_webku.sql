-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Mar 2021 pada 18.58
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz_webku`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_movies`
--

CREATE TABLE `tb_movies` (
  `id` int(10) NOT NULL,
  `id_movie` int(10) NOT NULL,
  `movie_title` varchar(128) NOT NULL,
  `movie_genre` varchar(150) NOT NULL,
  `duration_movie` varchar(18) NOT NULL,
  `release_date` date NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_movies`
--

INSERT INTO `tb_movies` (`id`, `id_movie`, `movie_title`, `movie_genre`, `duration_movie`, `release_date`, `updated_at`, `created_at`) VALUES
(1, 1, 'John Wick: Chapter 3 – Parabellum', 'Action, Crime, Thriller ', ' 2h 10min', '2019-05-17', '2021-03-05 15:45:40', '2021-03-05 15:45:40'),
(2, 2, 'Spider-Man: Homecoming', 'Action, Adventure, Sci-F', '2h 13min', '2017-07-07', '2021-03-05 15:45:40', '2021-03-05 15:45:40'),
(3, 3, 'The Lion King ', 'Animation, Adventure, Drama', '1h 58min ', '2019-07-19', '2021-03-05 15:50:36', '2021-03-05 15:50:36'),
(4, 4, 'Black Widow', 'Action, Adventure, Sci-Fi', '2h 13min', '2021-05-07', '2021-03-05 15:50:36', '2021-03-05 15:50:36'),
(5, 5, 'The witches', 'Adventure, Comedy, Family ', '1h 46min', '2020-10-20', '2021-03-05 15:50:36', '2021-03-05 15:50:36'),
(6, 6, 'Tenet', 'Action, Sci-Fi, Thriller ', '2h 30min', '2020-09-03', '2021-03-05 15:50:36', '2021-03-05 15:50:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_tickets`
--

CREATE TABLE `tb_tickets` (
  `id` int(10) NOT NULL,
  `id_tiket` int(10) NOT NULL,
  `id_film` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `price` varchar(20) NOT NULL,
  `location` varchar(64) NOT NULL,
  `cinema_name` varchar(64) NOT NULL,
  `ticket_status` varchar(20) NOT NULL,
  `seats` varchar(64) NOT NULL,
  `count` int(10) NOT NULL,
  `date_time` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_tickets`
--

INSERT INTO `tb_tickets` (`id`, `id_tiket`, `id_film`, `id_user`, `price`, `location`, `cinema_name`, `ticket_status`, `seats`, `count`, `date_time`, `updated_at`, `created_at`) VALUES
(1, 1, 2, 1, '50000', 'Purwokerto', 'ebv.id', 'Ticket Used', '3B\r\n', 1, '2021-03-05 13:30:00', '2021-03-05 16:04:20', '2021-03-05 16:04:20'),
(2, 2, 3, 2, '50000', 'Semarang', 'CineOne21', 'Ticket In Active', '6G, 7G\r\n', 2, '2021-03-10 15:00:00', '2021-03-05 16:13:31', '2021-03-05 16:13:31'),
(3, 3, 4, 3, '50000', 'Purwokerto', 'hiflix', 'Ticket Used', '14E', 1, '2021-03-07 10:00:00', '2021-03-05 16:13:31', '2021-03-05 16:13:31'),
(4, 4, 1, 3, '50000', 'Purwokerto', 'CineOne21', 'Ticket In Active', '9C', 1, '2021-03-12 13:30:00', '2021-03-05 16:13:31', '2021-03-05 16:13:31'),
(5, 5, 5, 1, '35000', 'Purwokerto', 'ebv.id', 'Ticket In Active', '8F, 9F, 10F', 3, '2021-03-15 19:00:00', '2021-03-05 16:13:31', '2021-03-05 16:13:31'),
(6, 6, 6, 5, '50000', 'Semarang', 'ebv.id', 'Ticket In Active', '7E', 1, '2021-03-11 15:00:00', '2021-03-05 16:21:37', '2021-03-05 16:21:37'),
(7, 7, 6, 6, '35000', 'Semarang', 'hiflix', 'Ticket Used', '14A\r\n', 1, '2021-03-05 10:00:00', '2021-03-05 16:21:37', '2021-03-05 16:21:37'),
(8, 8, 4, 2, '35000', 'Purwokerto', 'CineOne21', 'Ticket Used', '5B, 6B, 7B', 3, '2021-03-04 16:00:00', '2021-03-05 16:21:37', '2021-03-05 16:21:37'),
(9, 9, 1, 5, '50000', 'Semarang', 'hiflix', 'Ticket In Active', '12A, 11A', 2, '2021-03-09 20:00:00', '2021-03-05 16:24:34', '2021-03-05 16:24:34'),
(10, 10, 5, 4, '35000', 'Purwokerto', 'CineOne21', 'Ticket Used', '2C, 3C', 2, '2021-03-08 10:00:00', '2021-03-05 16:24:34', '2021-03-05 16:24:34'),
(13, 11, 2, 3, '50000', 'Semarang', 'ebv.id', 'Ticket In Active', '3B\r\n', 1, '2021-03-11 16:30:00', '2021-03-06 21:09:22', '2021-03-06 21:08:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_transactions`
--

CREATE TABLE `tb_transactions` (
  `id` int(10) NOT NULL,
  `id_ticket` int(10) NOT NULL,
  `id_movie` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `id_transaction` int(10) NOT NULL,
  `total_payment` varchar(13) NOT NULL,
  `payment_methods` varchar(64) NOT NULL,
  `status_payment` varchar(64) NOT NULL,
  `order_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_transactions`
--

INSERT INTO `tb_transactions` (`id`, `id_ticket`, `id_movie`, `id_user`, `id_transaction`, `total_payment`, `payment_methods`, `status_payment`, `order_date`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 1, '50000', 'Dana', 'Unpaid', '2021-03-01 09:20:38', '2021-03-05 16:45:44', '2021-03-05 16:45:44'),
(2, 2, 3, 2, 2, '100000', 'Paypal', 'Paid', '2021-03-02 13:47:01', '2021-03-05 16:49:22', '2021-03-05 16:49:22'),
(3, 3, 4, 3, 3, '50000', 'BCA\r\n', 'Unpaid\r\n', '2021-03-03 10:47:01', '2021-03-05 16:49:22', '2021-03-05 16:49:22'),
(4, 4, 1, 3, 4, '50000', 'BRI\r\n', 'Paid\r\n', '2021-03-06 09:26:39', '2021-03-05 16:54:05', '2021-03-05 16:54:05'),
(5, 5, 5, 1, 5, '105000', 'GoPay\r\n', 'Paid\r\n', '2021-03-07 15:49:39', '2021-03-05 16:54:05', '2021-03-05 16:54:05'),
(6, 6, 6, 5, 6, '50000', 'GoPay\r\n', 'Unpaid\r\n', '2021-03-05 14:49:39', '2021-03-05 16:54:05', '2021-03-05 16:54:05'),
(7, 7, 6, 6, 7, '35000', 'Dana\r\n', 'Paid\r\n', '2021-03-06 11:54:36', '2021-03-05 16:59:03', '2021-03-05 16:59:03'),
(8, 8, 4, 2, 8, '105000', 'Ovo\r\n', 'Paid\r\n', '2021-03-01 14:54:36', '2021-03-05 16:59:03', '2021-03-05 16:59:03'),
(9, 9, 1, 5, 9, '100000', 'Visa\r\n', 'Unpaid\r\n', '2021-03-06 09:30:36', '2021-03-05 16:59:03', '2021-03-05 16:59:03'),
(10, 10, 5, 4, 10, '70000', 'Google Pay\r\n', 'Paid\r\n', '2021-03-04 18:16:36', '2021-03-05 16:59:03', '2021-03-05 16:59:03'),
(13, 11, 2, 11, 11, '50000', 'BCA', 'Paid', '2021-03-12 06:30:00', '2021-03-07 05:43:22', '2021-03-07 05:43:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `full_name` varchar(64) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `phone_number` varchar(14) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tb_users`
--

INSERT INTO `tb_users` (`id`, `id_user`, `full_name`, `gender`, `email`, `password`, `phone_number`, `created_at`, `updated_at`) VALUES
(1, 1, 'Nevalen Aginda Prasetyo', 'male', 'nevalen@gmail.com', 'nevalen321', '081438084053', '2021-03-05 15:30:24', '2021-03-05 15:30:24'),
(2, 2, 'Tomi Mandala Putra', 'male', 'tomiaja@gmail.com', 'tomii123', '082138084059', '2021-03-05 15:31:39', '2021-03-05 15:31:39'),
(3, 3, 'Friska Tiara Desy', 'female', 'friska24@gmail.com', 'friskaa16', '089337684059', '2021-03-05 15:33:04', '2021-03-05 15:33:04'),
(4, 4, 'Dewi Puspita Sari', 'female', 'dewipus@gmail.com', '123dewiaja', '089537688090', '2021-03-05 15:34:41', '2021-03-05 15:34:41'),
(5, 5, 'Nanda Ayu\r\n', 'female', 'nandaayu@gmail.com', 'catlover98', '081527681093', '2021-03-05 15:35:39', '2021-03-05 15:35:39'),
(6, 6, 'Mahardika Setiawan', 'male', 'mahardika12@gmail.com', 'mahardika12', '081345678810', '2021-03-05 15:36:37', '2021-03-05 15:36:37');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tb_movies`
--
ALTER TABLE `tb_movies`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_tickets`
--
ALTER TABLE `tb_tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tb_transactions`
--
ALTER TABLE `tb_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_movie` (`id_movie`);

--
-- Indeks untuk tabel `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tb_movies`
--
ALTER TABLE `tb_movies`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `tb_tickets`
--
ALTER TABLE `tb_tickets`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `tb_transactions`
--
ALTER TABLE `tb_transactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
