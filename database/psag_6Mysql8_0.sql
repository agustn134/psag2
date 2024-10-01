-- phpMyAdmin SQL Dump para MySQL 8.0
-- Versión del servidor: 8.0.x
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Configuración de codificación
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `bd_psga6`

-- Estructura de tabla para `game`
CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(180) DEFAULT NULL,
  `description` varchar(180) DEFAULT NULL,
  `creted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `game`
INSERT INTO `game` (`id`, `title`, `description`, `creted_at`) VALUES
(1, 'Dulce', 'KandyCrush', '2024-09-23 00:14:02'),
(4, 'Iphone 11', 'Celular Cool', '2024-09-29 03:34:03'),
(5, 'fgdfg', 'dfgdf', '2024-09-29 19:46:43');

-- Estructura de tabla para `tb_carreras`
CREATE TABLE `tb_carreras` (
  `id_carrera` int(11) NOT NULL AUTO_INCREMENT,
  `carrera` varchar(60) NOT NULL,
  `area` varchar(10) NOT NULL,
  PRIMARY KEY (`id_carrera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `tb_carreras`
INSERT INTO `tb_carreras` (`id_carrera`, `carrera`, `area`) VALUES
(1, 'Psicología', 'Ciencias S'),
(2, 'Medicina', 'Ciencias d'),
(3, 'Ingeniería en Sistemas', 'Ingeniería');

-- Estructura de tabla para `tb_citas`
CREATE TABLE `tb_citas` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `id_psicologo` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_consultorio` int(11) NOT NULL,
  `id_horario` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(200) NOT NULL,
  `estatus` enum('Pendiente','Aceptada','Rechazada') NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`id_cita`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `tb_citas`
INSERT INTO `tb_citas` (`id_cita`, `id_psicologo`, `id_alumno`, `id_consultorio`, `id_horario`, `dia_semana`, `hora`, `motivo`, `estatus`) VALUES
(1, 1, 1, 1, 1, 'Lunes', '16:00:00', 'Consulta inicial', 'Pendiente'),
(2, 1, 2, 1, 2, 'Martes', '16:00:00', 'Seguimiento', 'Pendiente'),
(3, 2, 3, 2, 3, 'Jueves', '14:00:00', 'Consulta general', 'Pendiente'),
(4, 5, 3, 1, 1, 'Lunes', '16:00:00', 'Estres', 'Pendiente');

-- Estructura de tabla para `tb_consultorio`
CREATE TABLE `tb_consultorio` (
  `id_consultorio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_consultorio` varchar(15) NOT NULL,
  `ubicacion` varchar(10) NOT NULL,
  PRIMARY KEY (`id_consultorio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `tb_consultorio`
INSERT INTO `tb_consultorio` (`id_consultorio`, `nombre_consultorio`, `ubicacion`) VALUES
(1, 'Consultorio 1', 'A1'),
(2, 'Consultorio 2', 'B2'),
(3, 'Consultorio 3', 'C3');

-- Estructura de tabla para `tb_horarios`
CREATE TABLE `tb_horarios` (
  `id_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_psicologo` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`id_horario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `tb_horarios`
INSERT INTO `tb_horarios` (`id_horario`, `id_psicologo`, `dia_semana`, `hora`) VALUES
(1, 1, 'Lunes', '16:00:00'),
(2, 1, 'Martes', '16:00:00'),
(3, 1, 'Miércoles', '16:00:00'),
(4, 2, 'Jueves', '14:00:00'),
(5, 2, 'Viernes', '10:00:00');

-- Estructura de tabla para `tb_roles`
CREATE TABLE `tb_roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `tb_roles`
INSERT INTO `tb_roles` (`id_rol`, `rol_nombre`) VALUES
(1, 'Alumno'),
(2, 'Psicologo'),
(3, 'Admin');

-- Estructura de tabla para `tb_usuarios`
CREATE TABLE `tb_usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `ape_paterno` varchar(15) NOT NULL,
  `ape_materno` varchar(15) NOT NULL,
  `e_mail` varchar(30) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `grupo` varchar(8) DEFAULT NULL,
  `id_rol` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos de ejemplo para `tb_usuarios`
INSERT INTO `tb_usuarios` (`id_usuario`, `nombre`, `ape_paterno`, `ape_materno`, `e_mail`, `password`, `telefono`, `id_carrera`, `grupo`, `id_rol`) VALUES
(1, 'Alum.Juan', 'Pérez', 'Gómez', 'juan.perez@example.com', 'password123', '555-1234', 1, NULL, 1),
(2, 'AlMaría', 'López', 'Martínez', 'maria.lopez@example.com', 'password123', '555-5678', 2, NULL, 1),
(3, 'AlCarlos', 'Sánchez', 'Rodríguez', 'carlos.sanchez@example.com', 'password123', '555-8765', NULL, NULL, 1),
(4, 'AlAna', 'Fernández', 'Díaz', 'ana.fernandez@example.com', 'password123', '555-4321', NULL, NULL, 1),
(5, 'Psico Luis', 'Martínez', 'García', 'lui.psicologo@example.com', 'password123', '555-1122', NULL, NULL, 2);

COMMIT;

-- Restaurar configuración previa de codificación
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
