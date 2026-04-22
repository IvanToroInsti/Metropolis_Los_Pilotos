#!/bin/bash

# Definir colores
ROJO='\e[31m'
VERDE='\e[32m'
AZUL='\e[34m'
RESET='\e[0m'

salir="false"

menu="${AZUL}MENU DE CONTROL - LOS PILOTOS${RESET}
1. Ver estado del servidor
2. Ver estado de los contenedores
3. Exportar logs de algun contenedor
4. Acciones
5. Version
6. Ayuda$\n"

menu2="${ROJO}1. Acceder a la base de datos${RESET}
2. Acceder a contenedor
3. Crear copia de seguridad base de datos
4. Reiniciar contenedor
5. Detener contenedor
6. iniciar contenedores (todos)
7. Detener contenedores (todos)
8. Recrear contenedores - Volver a compilar
9. Eliminar contenedores (todos)
10. Limpieza de imágenes sin uso"

contenedores="1. Contenedor Web
2. Contenedor Server
3. Contenedor Mariadb"

continuar="\n${VERDE}[*] Presione enter para continuar...\n${RESET}"
destino="Ingresa el destino (Default: ./backups): "
opc="Opción: "
question="¿Estas seguro? (Y,n): "
error="Entrada inválida, vuelve a intentar"

acciones(){
    echo -e "$menu2"
    read -p "$opc" opcion

    if [[ "$opcion" =~ ^[0-9]+$ ]];
    then
        # clear
        case $opcion in
            "1") # 	1. Acceder a la base de datos
                echo "Por favor, espere..."
                ./db/scripts/mariadb.sh
                ;;

            "2") # 	2. Acceder a contenedor
                echo "$contenedores"
                read -p "$opc"
                ;;

            "3") # 	3. Crear copia de seguridad base de datos
                read -p "$destino" dest
                ;;

            "4") # 	4.Reiniciar contenedor
                echo "$contenedores"
                read -p "$opc"
                ;;

            "5") # 	5. Detener contenedor
                echo "$contenedores"
                read -p "$opc"
                ;;

            "6") # 	6. Iniciar contenedores (todos)
                read -p "$question" success
                read -p "¿Iniciar contenedores en segundo plano? (y,N): " detached

                if [[ $success == "Y" && $detached != "N" ]]
                then
                    echo ""
                    docker compose -f /home/diego/los_pilotos/docker-compose.yml up -d
                elif [[ $success == "Y" && $detached != "N" ]]
                then
                    echo ""
                    docker compose -f /home/diego/los_pilotos/docker-compose.yml up 
                elif [[ $success == "n" ]]
                then
                    ""
                else
                    printf "$error"
                fi

                ;;

            "7") # 	7. Detener contenedores (todos)
                read -p "$question" success

                docker compose -f /home/diego/los_pilotos/docker-compose.yml stop

                ;;

            "8") # 	8. Recrear contenedores - Volver a compilar (todos)
                read -p "$question" success

                docker compose down
                docker compose up --build

                ;;

            "9") # 	8. Eliminar contenedores (todos)
                read -p "$question" success
                docker compose down -v

                ;;

            "10") # 	9. Limpieza de imágenes sin uso
                read -p "$question" success

                docker system prune
                ;;
        esac
    fi

}

while [[ salir != "true" ]]
do
    printf "$menu"
    read -p "$opc" opcion

    if [[ "$opcion" =~ ^[0-9]+$ ]];
    then
        # clear
        echo
        case $opcion in
            "1") # 1. Ver estado del servidor
                top
                ;;

            "2") # 2. Ver estado de los contenedores
                docker ps -a
                ;;

            "3") # 3. Exportar logs de algun contenedor
                read -p "$destino" $ruta
                
                printf "$contenedores"
                read -p "$opc" $container
                ;;

            "4") # 4. Acciones

                if [[ $EUID -ne 0 ]]
                then
                    exit 1
                fi

                acciones

                ;;
            "5") # 5. Version
                echo "funciona"
                ;;

            "6") # 6. Ayuda
                echo "funciona"
                ;;

            *)
                echo "Entrada inválida, vuelve a intentar"
                ;;
        esac

    else
        printf "$error"
    fi
    printf "$continuar"
    # clear

done