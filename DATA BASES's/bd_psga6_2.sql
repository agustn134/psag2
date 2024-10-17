-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2024 a las 01:51:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_psga6`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `title` varchar(180) DEFAULT NULL,
  `description` varchar(180) DEFAULT NULL,
  `creted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `game`
--

INSERT INTO `game` (`id`, `title`, `description`, `creted_at`) VALUES
(1, 'Dulce', 'KandyCrush', '2024-09-23 00:14:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_carreras`
--

CREATE TABLE `tb_carreras` (
  `id_carrera` int(11) NOT NULL,
  `carrera` varchar(60) NOT NULL,
  `area` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_carreras`
--

INSERT INTO `tb_carreras` (`id_carrera`, `carrera`, `area`) VALUES
(1, 'Psicología', 'Ciencias S'),
(2, 'Medicina', 'Ciencias d'),
(3, 'Ingeniería en Sistemas', 'Ingeniería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_citas`
--

CREATE TABLE `tb_citas` (
  `id_cita` int(11) NOT NULL,
  `id_psicologo` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_consultorio` int(11) NOT NULL,
  `id_horario` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(200) NOT NULL,
  `estatus` enum('Pendiente','Aceptada','Rechazada') NOT NULL DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_citas`
--

INSERT INTO `tb_citas` (`id_cita`, `id_psicologo`, `id_alumno`, `id_consultorio`, `id_horario`, `dia_semana`, `hora`, `motivo`, `estatus`) VALUES
(1, 1, 1, 1, 1, 'Lunes', '16:00:00', 'Consulta inicial', 'Pendiente'),
(2, 1, 2, 1, 2, 'Martes', '16:00:00', 'Seguimiento', 'Pendiente'),
(3, 2, 3, 2, 3, 'Jueves', '14:00:00', 'Consulta general', 'Pendiente'),
(4, 5, 3, 1, 1, 'Lunes', '16:00:00', 'Estres', 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_consultorio`
--

CREATE TABLE `tb_consultorio` (
  `id_consultorio` int(11) NOT NULL,
  `nombre_consultorio` varchar(15) NOT NULL,
  `ubicacion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_consultorio`
--

INSERT INTO `tb_consultorio` (`id_consultorio`, `nombre_consultorio`, `ubicacion`) VALUES
(1, 'Consultorio 1', 'A1'),
(2, 'Consultorio 2', 'B2'),
(3, 'Consultorio 3', 'C3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_horarios`
--

CREATE TABLE `tb_horarios` (
  `id_horario` int(11) NOT NULL,
  `id_psicologo` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_horarios`
--

INSERT INTO `tb_horarios` (`id_horario`, `id_psicologo`, `dia_semana`, `hora`) VALUES
(1, 1, 'Lunes', '16:00:00'),
(2, 1, 'Martes', '16:00:00'),
(3, 1, 'Miércoles', '16:00:00'),
(4, 2, 'Jueves', '14:00:00'),
(5, 2, 'Viernes', '10:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_roles`
--

CREATE TABLE `tb_roles` (
  `id_rol` int(11) NOT NULL,
  `rol_nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_roles`
--

INSERT INTO `tb_roles` (`id_rol`, `rol_nombre`) VALUES
(1, 'Alumno'),
(2, 'Psicologo'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `ape_paterno` varchar(15) NOT NULL,
  `ape_materno` varchar(15) NOT NULL,
  `e_mail` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `grupo` varchar(8) DEFAULT NULL,
  `id_rol` int(11) DEFAULT 1,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id_usuario`, `nombre`, `ape_paterno`, `ape_materno`, `e_mail`, `password`, `telefono`, `id_carrera`, `grupo`, `id_rol`, `imagen_url`) VALUES
(1, 'Alum.Juan', 'Pérez', 'Gómez', 'juan.perez@example.com', 'password123', '555-1234', 1, NULL, 1, NULL),
(2, 'AlMaría', 'López', 'Martínez', 'maria.lopez@example.com', 'password123', '555-5678', 2, NULL, 1, NULL),
(3, 'AlCarlos', 'Sánchez', 'Rodríguez', 'carlos.sanchez@example.com', 'password123', '555-8765', NULL, NULL, 1, NULL),
(5, 'Psico Luis', 'Martínez', 'García', 'lui.psicologo@example.com', 'password123', '555-1122', NULL, NULL, 2, NULL),
(8, 'Descremado', 'Calsio', 'D Hueso', 'Lechero@gmail.com', 'pass123', '4681134553', 3, 'GDS0543', 1, NULL),
(63, 'Marcos', 'Ontiveros', 'Ontiveros', 'MOntiveros@gmail.com', '$2b$10$KRGjxCB7BRK7M78lh86zgOM.oienqqWYGqhDWjG6Zk2Qv0DIX9UCS', '4681134553', 2, 'GDS0543', 1, 'https://images.unsplash.com/photo-1726756882806-cad5dcac46f2?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(71, 'ADMIN', 'ADMIN P', 'ADMIN M', 'admin12@gmail.com', '$2b$10$bJx/gEZm5MEwaVLCfMuiIu3hx8duYaxNGRM9fXXvtvzqtKFGNpnOS', '555-1234', 1, '1234566', 3, 'https://images.unsplash.com/photo-1727713274968-ebd3714a5c55?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(72, 'ADMIN', 'ADMIN P', 'ADMIN M', 'admin12@gmafdfil.com', '$2b$10$WGJDsgKIVrlWIKRJduhmd.8HuG1j.FNOEC9VeKNJTrggTHZt8oxFe', '555-1234', 1, '1234566', 3, 'https://images.unsplash.com/photo-1727713274968-ebd3714a5c55?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(78, 'Ivan', 'Parra', 'Parra', 'ivanparra@gmail.com', '$2b$10$pzIXcllJNBRKuW3TrjamAOh30WtC39jXxX0ogdxZM7wnBz1KYCoBy', '4681134553', 3, 'GDS0543', 3, 'https://images.unsplash.com/photo-1727713274968-ebd3714a5c55?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(82, 'Dulce', 'Dulce', 'Dulce', 'admindd12@gmail.com', '$2b$10$Avgi1.59/j9/Kz2.FIm7SeLJ4c0OOPTN.HUuZN5fb4peeFKbSKFaW', '4681134553', 2, 'GDS0543', 1, 'https://images.unsplash.com/photo-1727713274968-ebd3714a5c55?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(83, 'Badbunny', 'bad P', 'bad M', 'bad@gmail.com', '$2b$10$SJgbjX6SmYIVQmIXE724W.fNyq0Jk5VfHCp3xfcmsXt2cdgt1qjqe', '555-123', 3, '1', 1, 'https://images.unsplash.com/photo-1727713274968-ebd3714a5c55?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_carreras`
--
ALTER TABLE `tb_carreras`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indices de la tabla `tb_citas`
--
ALTER TABLE `tb_citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_psicologo` (`id_psicologo`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_consultorio` (`id_consultorio`),
  ADD KEY `id_horario` (`id_horario`);

--
-- Indices de la tabla `tb_consultorio`
--
ALTER TABLE `tb_consultorio`
  ADD PRIMARY KEY (`id_consultorio`);

--
-- Indices de la tabla `tb_horarios`
--
ALTER TABLE `tb_horarios`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `id_psicologo` (`id_psicologo`);

--
-- Indices de la tabla `tb_roles`
--
ALTER TABLE `tb_roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `e_mail` (`e_mail`),
  ADD KEY `id_carrera` (`id_carrera`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_carreras`
--
ALTER TABLE `tb_carreras`
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_citas`
--
ALTER TABLE `tb_citas`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_consultorio`
--
ALTER TABLE `tb_consultorio`
  MODIFY `id_consultorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_horarios`
--
ALTER TABLE `tb_horarios`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_roles`
--
ALTER TABLE `tb_roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_citas`
--
ALTER TABLE `tb_citas`
  ADD CONSTRAINT `tb_citas_ibfk_1` FOREIGN KEY (`id_psicologo`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE NO ACTION,
  ADD CONSTRAINT `tb_citas_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE NO ACTION,
  ADD CONSTRAINT `tb_citas_ibfk_3` FOREIGN KEY (`id_consultorio`) REFERENCES `tb_consultorio` (`id_consultorio`) ON DELETE CASCADE,
  ADD CONSTRAINT `tb_citas_ibfk_4` FOREIGN KEY (`id_horario`) REFERENCES `tb_horarios` (`id_horario`) ON DELETE NO ACTION;

--
-- Filtros para la tabla `tb_horarios`
--
ALTER TABLE `tb_horarios`
  ADD CONSTRAINT `tb_horarios_ibfk_1` FOREIGN KEY (`id_psicologo`) REFERENCES `tb_usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD CONSTRAINT `tb_usuarios_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `tb_carreras` (`id_carrera`) ON DELETE NO ACTION,
  ADD CONSTRAINT `tb_usuarios_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `tb_roles` (`id_rol`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
