-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-12-2023 a las 03:17:41
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
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `mail` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `idRol` int(11) NOT NULL,
  `img_id` text DEFAULT NULL,
  `saldo` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--


--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `tr_CreateUser` AFTER INSERT ON `usuarios` FOR EACH ROW BEGIN
    DECLARE idUsuario INT;
    SELECT NEW.idUsuario INTO idUsuario;

    INSERT INTO categorias (nombre, idUsuario) VALUES ('Efectivo', idUsuario);
    INSERT INTO categorias (nombre, idUsuario) VALUES ('Debito', idUsuario);
    INSERT INTO categorias (nombre, idUsuario) VALUES ('Credito', idUsuario);
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `mail` (`mail`) USING HASH;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
