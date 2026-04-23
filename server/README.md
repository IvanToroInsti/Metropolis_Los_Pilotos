Compilar el proyecto
`sudo docker build --no-cache -t server_lospilotos .`

Ejectuar el proyecto compartiendo el puerto 3000 y asignandole sv1 como nombre a la imagen recien compilada:
`sudo docker run -d -p 3000:3000 --name sv1 server_lospilotos`

Una vez se haya ejecutado el comando, podra acceder al servidor para comprobar su funcionamiento desde la url `http://127.0.0.1:3000`

Eliminar contenedores (Si es necesario)
`sudo docker builder prune -f`
`sudo docker prune`

