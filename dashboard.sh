#!/bin/bash

# MENU DE CONTROL - LOS PILOTOS
# 1. Ver estado del servidor
# 2. Ver estado de los contenedores
# 3. Exportar logs de algun contenedor
# 	> Ingresa el destino (Default: ./backups):
# 	1. Contenedor Web
# 	2. Contenedor Server
# 	3. Contenedor Mariadb

# 4. Acciones
# 	1. Acceder a la base de datos
# 	2. Acceder a contenedor
# 		1. Contenedor Web
# 		2. Contenedor Server
# 		3. Contenedor Mariadb
# 	3. Crear copia de seguridad base de datos
# 		> Ingresa el destino (Default: ./backups):
# 	4.Reiniciar contenedor
# 		1. Contenedor Web
# 		2. Contenedor Server
# 		3. Contenedor Mariadb
# 	5. Detener contenedor
# 		1. Contenedor Web
# 		2. Contenedor Server
# 		3. Contenedor Mariadb
# 	6. Detener contenedores (todos)
# 	7. Recrear contenedores (todos)
# 	8. Eliminar contenedores (todos)
# 		> Eliminar volumenes (Y,n):
# 	9. Limpieza de imágenes sin uso
	
# 5. Version
# 6. Ayuda