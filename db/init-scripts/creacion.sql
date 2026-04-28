USE lospilotos_db;
-- 1. Tabla de Roles
CREATE TABLE rol (
  id_rol INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  prioridad INT NOT NULL DEFAULT 100,
  PRIMARY KEY (id_rol)
);

-- 2. Tabla de Usuarios
CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  correo VARCHAR(100) NOT NULL,
  contrasena VARCHAR(200) NOT NULL,
  PRIMARY KEY (id_usuario)
);

-- 3. Tabla intermedia Usuario-Rol (Relación N:M)
CREATE TABLE user_rol (
  id_user INT NOT NULL,
  id_rol INT NOT NULL,
  fecha_union TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_user, id_rol),
  FOREIGN KEY (id_user) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- 4. Tabla de Anuncios
CREATE TABLE anuncio (
  id_anuncio INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  prioridad INT NOT NULL DEFAULT 0,
  publico BOOLEAN NOT NULL DEFAULT FALSE,
  id_autor INT NOT NULL, 
  creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_anuncio),
  FOREIGN KEY (id_editor) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_autor) REFERENCES usuario(id_usuario)
);

-- 5. Tabla de Puntos
CREATE TABLE punto (
  id_punto INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  latitud DECIMAL(10,8) NOT NULL,
  longitud DECIMAL(11,8) NOT NULL,
  publico BOOLEAN NOT NULL DEFAULT FALSE,
  id_autor INT NOT NULL, -- El usuario que creó el punto
  creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_punto),
  FOREIGN KEY (id_autor) REFERENCES usuario(id_usuario)
);

CREATE USER IF NOT EXISTS 'sys_admin'@'172.18.%.%' IDENTIFIED BY 'hola1234';
GRANT ALL PRIVILEGES ON lospilotos_db.* TO 'sys_admin'@'172.18.%.%';

CREATE USER IF NOT EXISTS 'dev_user'@'172.18.%.%' IDENTIFIED BY 'hola1234';
GRANT SELECT, INSERT, UPDATE, DELETE ON lospilotos_db.* TO 'dev_user'@'172.18.%.%';

FLUSH PRIVILEGES;