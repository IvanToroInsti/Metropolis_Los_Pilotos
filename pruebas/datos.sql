USE lospilotos_db;

-- 1. Inserción de Roles
-- El administrador tiene prioridad 0 (máxima) y el usuario estándar 100.
INSERT INTO rol (titulo, prioridad) VALUES 
('Administrador', 0),
('Staff Evento', 10),
('Usuario Público', 100);

-- 2. Inserción de Usuarios (Miembros del grupo Los Pilotos)
-- Las contraseñas están en texto plano por el ejemplo, pero deberían ir hasheadas.
INSERT INTO usuario (nombre, telefono, correo, contrasena) VALUES 
('Joan Mendoza', '600000001', 'joan@lospilotos.cat', 'piloto123'),
('Ivan Toro', '600000002', 'ivan@lospilotos.cat', 'piloto123'),
('Dylan Balon', '600000003', 'dylan@lospilotos.cat', 'piloto123'),
('Diego Fernandez', '600000004', 'diego@lospilotos.cat', 'piloto123');

-- 3. Asignación de Roles (Relación N:M)
-- Joan será Administrador, el resto Staff/Usuarios para pruebas.
INSERT INTO user_rol (id_user, id_rol) VALUES 
(1, 1), -- Joan -> Admin
(2, 2), -- Ivan -> Staff
(3, 3), -- Dylan -> Usuario
(4, 3); -- Diego -> Usuario

-- 4. Inserción de Anuncios (Contexto Circuit de Catalunya)
-- Avisos en tiempo real para el tablón de anuncios.
INSERT INTO anuncio (titulo, descripcion, prioridad, publico, id_autor) VALUES 
('Apertura de Puertas', 'Las puertas del recinto se abrirán a las 08:00 AM para el Gran Premio.', 1, 1, 1),
('Aviso de Congestión', 'Alta afluencia de gente en el Túnel de acceso a la Pelouse. Se recomienda usar el puente elevado.', 2, 1, 2),
('Cambio de Horario Paddock', 'La sesión de firmas se adelanta 15 minutos debido a condiciones meteorológicas.', 1, 1, 1),
('Parking C Completo', 'El Parking C ha alcanzado su capacidad máxima. Diríjanse al Parking D siguiendo las señales de los comisarios.', 3, 1, 2);

-- 5. Inserción de Puntos (Geolocalización real en el Circuit)
-- Coordenadas aproximadas de puntos clave para el mapa interactivo.
INSERT INTO punto (titulo, descripcion, latitud, longitud, publico, id_autor) VALUES 
('Grada Principal', 'Ubicada frente a la línea de meta y boxes.', 41.570120, 2.261220, 1, 1),
('Fan Zone - Escenario', 'Zona de activaciones, conciertos y restauración principal.', 41.565800, 2.256100, 1, 1),
('Parking A', 'Parking para abonados y prensa cerca de la Torre de Control.', 41.571500, 2.264500, 1, 2),
('Punto de Información Puerta 3', 'Asistencia al visitante y recogida de objetos perdidos.', 41.563200, 2.253400, 1, 2),
('Zona de Restauración Curva 10', 'Punto con Food Trucks y servicios médicos.', 41.576500, 2.252300, 1, 1);