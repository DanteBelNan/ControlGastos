-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-12-2023 a las 03:36:00
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controlgastos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `idMovimiento` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `detalle` text DEFAULT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`idMovimiento`, `idUsuario`, `idCategoria`, `monto`, `detalle`, `fecha`) VALUES
(1, 1, 15, 5, 'prueba', '2023-12-15 16:36:52'),
(2, 8, 1, 5, 'prueba', '2023-12-17 23:33:39'),
(3, 8, 1, 51234, 'offdate', '2003-05-13 21:00:00'),
(4, 8, 1, 5, 'prueba2', '2023-12-17 23:38:12'),
(5, 8, 2, 5, 'prueba', '2023-12-20 23:52:06'),
(6, 8, 20, 1500, 'Primera compra con MErcadopago', '2023-12-24 14:50:59'),
(7, 8, 20, 1234, 'segunda compra con MErcadopago', '2023-11-14 21:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`idMovimiento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `idMovimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
