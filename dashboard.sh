#!/bin/bash

# Definir colores
ROJO='\e[31m'
VERDE='\e[32m'
AZUL='\e[34m'
RESET='\e[0m'

salir="false"

menu="${AZUL}MENU DE CONTROL - LOS PILOTOS${RESET}
${AZUL}1.${RESET} Ver estado del servidor
${AZUL}2.${RESET} Ver estado de los contenedores
${AZUL}3.${RESET} Exportar logs de algun contenedor
${AZUL}4.${RESET} Acciones
${AZUL}5.${RESET} Version
${AZUL}6.${RESET} Ayuda
${AZUL}7.${RESET} Salir\n"

menu2="${AZUL}MENU DE ACCIONES - LOS PILOTOS${RESET}
${AZUL}1.${RESET} Acceder a la base de datos
${AZUL}2.${RESET} Acceder a contenedor
${AZUL}3.${RESET} Crear copia de seguridad base de datos
${AZUL}4.${RESET} Reiniciar contenedor
${AZUL}5.${RESET} Detener contenedor
${AZUL}6.${RESET} iniciar contenedores (todos)
${AZUL}7.${RESET} Detener contenedores (todos)
${AZUL}8.${RESET} Recrear contenedores - Volver a compilar
${AZUL}9.${RESET} Eliminar contenedores (todos)
${AZUL}10.${RESET} Limpieza de imágenes sin uso
${AZUL}11.${RESET} Volver"

contenedores="${AZUL}1.${RESET} Contenedor nginx
${AZUL}2.${RESET} Contenedor web
${AZUL}3.${RESET} Contenedor Server
${AZUL}4.${RESET} Contenedor database\n"

continuar="${VERDE}[*] Presione enter para continuar...${RESET}\n"
destino="${VERDE}Ingresa el destino (Default: ./backups):${RESET} "
opc="${AZUL}Opción: ${RESET}"
question="${ROJO}¿Estas seguro? (Y,n):${RESET} "
error="${ROJO}Entrada inválida, vuelve a intentar${RESET}\n"

backups() {
    # 1. Usamos la expansión de parámetros para el default
    # Si $1 está vacío, usamos ./backups/$2.log
    local ruta_destino="${1:-./backups/$2.log}"
    
    # Aseguramos que la ruta termine en .log si el usuario no lo puso
    [[ "$ruta_destino" != *.log ]] && ruta_destino="${ruta_destino}.log"
    
    local contenedor="$2"
    
    # 2. Corregido: añadimos el $ para acceder a la variable
    local directorio=$(dirname "$ruta_destino")

    # 3. Creamos el directorio (la opción -p evita errores si ya existe)
    if ! mkdir -p "$directorio"; then
        printf "${ROJO}[!] No se pudo crear el directorio: %s${RESET}\n" "$directorio"
        return 1
    fi

    # 4. Ejecutar el log
    if docker compose logs "$contenedor" > "$ruta_destino" 2>&1; then
        printf "${VERDE}[+] Log de '%s' guardado en: %s${RESET}\n" "$contenedor" "$ruta_destino"
    else
        printf "${ROJO}[!] Error al obtener logs del contenedor: %s${RESET}\n" "$contenedor"
    fi
}

acciones(){
    echo -e "$menu2"
    printf "$opc"
    read opcion

    if [[ "$opcion" =~ ^[0-9]+$ ]];
    then
        # clear
        case $opcion in
            "1") # 	1. Acceder a la base de datos
                echo "Por favor, espere..."
                ./db/scripts/mariadb.sh
                ;;

            "2") # 	2. Acceder a contenedor

                printf "${AZUL}Contenedores activos: ${RESET}\n"
                docker ps --format "{{.Names}}"

                printf "${VERDE}Ingresar nombre del contenedor: ${RESET}"
                read seleccion
                
                # ¿Tiene bash?
                if docker exec "$seleccion" test -x /bin/bash; then
                    docker exec -it "$seleccion" /bin/bash
                # ¿Tiene sh?
                elif docker exec "$seleccion" test -x /bin/sh; then
                    docker exec -it "$seleccion" /bin/sh
                else
                    printf "\n${ROJO}No se ha logrado establecer conexión con la máquina.${RESET}"
                fi
                ;;

            "3") # 	3. Crear copia de seguridad base de datos
                printf "$destino"
                read dest

                backups $dest
                ;;

            "4") # 	4.Reiniciar contenedor
                echo "$contenedores"
                printf "$opc"
                read seleccion
                ;;

            "5") # 	5. Detener contenedor
                echo "$contenedores"
                printf "$opc"
                read seleccion
                ;;

            "6") # 	6. Iniciar contenedores (todos)
                printf "$question"
                read success
                printf "${VERDE}¿Iniciar contenedores en segundo plano? (y,N): ${RESET}"
                read detached

                if [[ "$success" == "Y" ]]; then
                    echo ""
                    if [[ "$detached" != "N" ]]; then
                        # Modo en segundo plano
                        docker compose -f /los_pilotos/docker-compose.yml up -d
                    else
                        # Modo en primer plano (sin -d)
                        docker compose -f /los_pilotos/docker-compose.yml up
                    fi
                elif [[ "$success" != "n" ]]; then
                    printf "%s" "$error"
                fi

                ;;

            "7") # 	7. Detener contenedores (todos)
                printf "$question"
                read success

                docker compose -f /los_pilotos/docker-compose.yml stop

                ;;

            "8") # 	8. Recrear contenedores - Volver a compilar (todos)
                printf "$question"
                read success

                docker compose down
                docker compose up --build -d

                ;;

            "9") # 	8. Eliminar contenedores (todos)
                printf "$question"
                read success
                docker compose down -v

                ;;

            "10") # 	9. Limpieza de imágenes sin uso
                printf "$question"
                read success

                docker system prune
                ;;
        esac
    else
        printf "$error"
    fi
}

while [[ salir != "true" ]]
do
    printf "$menu"
    printf "$opc"
    read opcion

    if [[ "$opcion" =~ ^[0-9]+$ ]];
    then
        # clear
        echo
        case $opcion in
            "1") # 1. Ver estado del servidor
                top
                ;;

            "2") # 2. Ver estado de los contenedores
                docker ps --format "{{.Names}}|{{.ID}}|{{.Status}}|{{.RunningFor}}" |
                while IFS="|" read -r name id status running; do
                    printf "${VERDE}Nombre:${RESET} %s\n" "$name"
                    printf "${VERDE}ID:${RESET} %s\n" "$id"
                    printf "${VERDE}Estado:${RESET} %s\n" "$status"
                    printf "${VERDE}Inicio hace:${RESET} %s\n---\n" "$running"
                done


                ;;

            "3") # 3. Exportar logs de algun contenedor
                printf "$destino"
                read r

                printf "$contenedores"
                printf "$opc"
                read seleccion

                contenedor=""

                case $seleccion in
                "1")
                contenedor="nginx"
                ;;
                "2")
                contenedor="web"
                ;;
                "3")
                contenedor="server"
                ;;
                
                "4")
                contenedor="database"
                ;;
                esac

                backups "$r" "$contenedor"
                ;;

            "4") # 4. Acciones

                if [[ $EUID -ne 0 ]]
                then
                    printf "${ROJO}[!] Para ejecutar acciones debe ser usuario root${RESET}\n"
                else
                    acciones
                fi

                ;;
            "5") # 5. Version
                printf "${VERDE}La versión es:${RESET} 0.1.0\n"
                ;;

            "6") # 6. Ayuda
            # Leer el archivo y aplicar colores con sed
            cat ./ayuda.txt
        esac

    else
        printf "$error"
    fi
    printf "$continuar"

    read
    # clear

done