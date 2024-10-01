-- Crear tabla de roles
CREATE TABLE tb_roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol_nombre VARCHAR(20) NOT NULL
);

-- Insertar roles (admin, psicologo, alumno)
INSERT INTO tb_roles (rol_nombre)
VALUES ('admin'), ('psicologo'), ('alumno');

-- Crear tabla de carreras
CREATE TABLE tb_carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    carrera VARCHAR(60) NOT NULL,
    area VARCHAR(10) NOT NULL
);

-- Crear tabla de usuarios
CREATE TABLE tb_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    ape_paterno VARCHAR(15) NOT NULL,
    ape_materno VARCHAR(15) NOT NULL,
    e_mail VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    id_carrera INT,        -- Opcional para alumnos
    grupo VARCHAR(8),      -- Opcional para alumnos
    especialidad VARCHAR(30), -- Opcional para psicólogos
    id_rol INT NOT NULL,
    FOREIGN KEY (id_carrera) REFERENCES tb_carreras(id_carrera) ON DELETE NO ACTION,
    FOREIGN KEY (id_rol) REFERENCES tb_roles(id_rol) ON DELETE NO ACTION
);

-- Crear tabla de consultorios
CREATE TABLE tb_consultorio (
    id_consultorio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_consultorio VARCHAR(15) NOT NULL,
    ubicacion VARCHAR(10) NOT NULL
);

-- Crear tabla de citas
CREATE TABLE tb_citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_psicologo INT NOT NULL,
    id_alumno INT NOT NULL,
    id_consultorio INT NOT NULL,
    tipo_consulta VARCHAR(12) NOT NULL,
    motivo VARCHAR(200) NOT NULL,
    fecha_propuesta DATE NOT NULL,
    hora_propuesta TIME NOT NULL,
    estatus VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_psicologo) REFERENCES tb_usuarios(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_alumno) REFERENCES tb_usuarios(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_consultorio) REFERENCES tb_consultorio(id_consultorio) ON DELETE CASCADE
);

-- Insertar datos en la tabla tb_carreras
INSERT INTO tb_carreras (carrera, area) VALUES
('TSU en Administración Área Capital Humano', 'EA'),
('TSU en Desarrollo de Negocios Área Mercadotécnia', 'EA'),
('TSU en Contaduría', 'EA'),
('TSU en Turismo', 'EA'),
('Licenciatura en Gestión del Capital Humano', 'EA'),
('Licenciatura en Innovación de Negocios y Mercadotécnia', 'EA'),
('Licenciatura en Contaduría', 'EA'),
('TSU en Desarrollo de Software Multiplataforma', 'TICS'),
('TSU en Infraestructura de Redes Digitales', 'TICS'),
('TSU en Entornos Virtuales y Negocios Digitales', 'TICS'),
('TSU en Diseño Digital', 'TICS'),
('Ingeniería en Desarrollo y Gestíon de Software', 'TICS'),
('Ingeniería en Redes Inteligentes y Ciberseguridad', 'TICS'),
('Ingeniería en Entornos Virtuales y Negocios Digitales', 'TICS'),
('Licenciatura en Diseño Digital y Producción Audiovisual', 'TICS'),
('TSU en Mecatrónica Área Instalaciónes Eléctricas Eficientes', 'IEE'),
('TSU en Procesos Industriales Área Manufactura', 'IEE'),
('TSU en Energías Renovables Área Calidad y Ahorro de Energía', 'IEE'),
('Ingeniería en Mecatrónica', 'IEE'),
('Ingeniería en Tecnologías de la Producción', 'IEE');

-- Insertar usuarios de prueba
INSERT INTO tb_usuarios (nombre, ape_paterno, ape_materno, e_mail, password, telefono, id_carrera, grupo, id_rol)
VALUES 
('Juan', 'Perez', 'Lopez', 'juan.perez@example.com', '1234', '555-1234', 1, 'A1', 3), -- Alumno
('Ana', 'Gomez', 'Martinez', 'ana.gomez@example.com', '5678', '555-1234', NULL, NULL, 2),   -- Psicólogo
('Luis', 'Garcia', 'Rodriguez', 'luis.garcia@example.com', 'admin123', '555-1234', NULL, NULL, 1); -- Admin

-- Insertar consultorios de prueba
INSERT INTO tb_consultorio (nombre_consultorio, ubicacion)
VALUES 
('Consultorio 1', 'Edificio C'),
('Consultorio 2', 'Edificio C');

-- Insertar citas de prueba
INSERT INTO tb_citas (id_psicologo, id_alumno, id_consultorio, tipo_consulta, motivo, fecha_propuesta, hora_propuesta, estatus)
VALUES 
(2, 1, 1, 'Individual', 'Ansiedad', '2024-10-05', '10:00', 'Confirmada');



-- ---------------------------------------------------------------




-- Crear tabla de carreras (opcional)
CREATE TABLE tb_carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    carrera VARCHAR(60) NOT NULL,
    area VARCHAR(10) NOT NULL
);

-- Crear tabla de usuarios
CREATE TABLE tb_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    ape_paterno VARCHAR(15) NOT NULL,
    ape_materno VARCHAR(15) NOT NULL,
    e_mail VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,   
    id_carrera INT,           -- Opcional para alumnos
    grupo VARCHAR(8),         -- Opcional para alumnos
    especialidad VARCHAR(30), -- Opcional para psicólogos
    rol NVARCHAR(10) CHECK (rol IN ('admin', 'psicologo', 'alumno')) NOT NULL DEFAULT 'alumno', -- Roles disponibles
    FOREIGN KEY (id_carrera) REFERENCES tb_carreras(id_carrera) ON DELETE NO ACTION
);

-- Insertar usuarios de prueba
INSERT INTO tb_usuarios (nombre, ape_paterno, ape_materno, e_mail, password, telefono, id_carrera, grupo, especialidad, rol)
VALUES 
('Luis', 'Garcia', 'Rodriguez', 'luis.garcia@example.com', 'admin123', '555-1234', NULL, NULL, 'admin'), -- Admin
('Ana', 'Gomez', 'Martinez', 'ana.gomez@example.com', '5678', '555-1234', NULL, 'Psicología clínica', 'psicologo'), -- Psicólogo
('Juan', 'Perez', 'Lopez', 'juan.perez@example.com', '1234', '555-1234', 1, 'A1', NULL, 'alumno'); -- Alumno

-- Insertar carreras de prueba (opcional)
INSERT INTO tb_carreras (carrera, area)
VALUES ('TSU en Desarrollo de Software Multiplataforma', 'TICS');



--------------------------------
CREATE TABLE game(
	id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180),
    description VARCHAR(180),
    creted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);
-- Crear tabla de roles 
CREATE TABLE tb_roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol_nombre VARCHAR(20) NOT NULL
);

-- Insertar el rol por defecto
INSERT INTO tb_roles (rol_nombre) VALUES ('Alumno'), ('Psicologo'), ('Admin');

-- Crear tabla de carreras
CREATE TABLE tb_carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    carrera VARCHAR(60) NOT NULL,
    area VARCHAR(10) NOT NULL
);

-- Crear tabla de usuarios
CREATE TABLE tb_usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    ape_paterno VARCHAR(15) NOT NULL,
    ape_materno VARCHAR(15) NOT NULL,
    e_mail VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    id_carrera INT,  -- Opcional para alumnos
    grupo VARCHAR(8),  -- Opcional para alumnos
    id_rol INT NOT NULL DEFAULT 1,  -- Rol por defecto: Alumno (asumiendo que el id_rol para 'Alumno' es 1)
    FOREIGN KEY (id_carrera) REFERENCES tb_carreras(id_carrera) ON DELETE NO ACTION,
    FOREIGN KEY (id_rol) REFERENCES tb_roles(id_rol) ON DELETE NO ACTION
);

-- Crear tabla de consultorios
CREATE TABLE tb_consultorio (
    id_consultorio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_consultorio VARCHAR(15) NOT NULL,
    ubicacion VARCHAR(10) NOT NULL
);

-- Crear tabla de horarios
CREATE TABLE tb_horarios (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_psicologo INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora TIME NOT NULL,
    FOREIGN KEY (id_psicologo) REFERENCES tb_usuarios(id_usuario) ON DELETE CASCADE
);

-- Crear tabla de citas
CREATE TABLE tb_citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_psicologo INT NOT NULL,
    id_alumno INT NOT NULL,
    id_consultorio INT NOT NULL,
    id_horario INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora TIME NOT NULL,
    motivo VARCHAR(200) NOT NULL,
    estatus ENUM('Pendiente', 'Aceptada', 'Rechazada') NOT NULL DEFAULT 'Pendiente',
    FOREIGN KEY (id_psicologo) REFERENCES tb_usuarios(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_alumno) REFERENCES tb_usuarios(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_consultorio) REFERENCES tb_consultorio(id_consultorio) ON DELETE CASCADE,
    FOREIGN KEY (id_horario) REFERENCES tb_horarios(id_horario) ON DELETE NO ACTION
);