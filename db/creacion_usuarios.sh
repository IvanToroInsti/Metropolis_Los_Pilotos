#!/bin/bash

if docker exec -i mariadb mariadb -u root -p'hola1234' <<EOF
CREATE USER IF NOT EXISTS 'sys_admin'@'172.18.%.%' IDENTIFIED BY 'hola1234';
GRANT ALL PRIVILEGES ON lospilotos_db.* TO 'sys_admin'@'172.18.%.%';

CREATE USER IF NOT EXISTS 'dev_user'@'172.18.%.%' IDENTIFIED BY 'hola1234';
GRANT SELECT, INSERT, UPDATE, DELETE ON lospilotos_db.* TO 'dev_user'@'172.18.%.%';

FLUSH PRIVILEGES;
EOF
then
  echo "[+] Usuario creado correctamente"
else
  echo "[!] Ha ocurrido un error al crear el usuario"
fi