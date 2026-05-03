### Inicio de sesión

`POST /api/user/login`

```JSON
{
    "correo":"prueba@los_pilotos.cat",
    "contrasena: "hola1234"
}
```

### Creación de usuario

`POST /api/user/`

```JSON
{
  "nombre": "Usuario Prueba 1",
  "telefono": "+34 161616 ",
  "correo": "prueba1@los_pilotos.cat",
  "contrasena": "hola1234"
}

```

### Creación de rol

`POST /api/rol`

```JSON
{
  "titulo": "Administrador",
  "prioridad": 0
}

```

### Asignacion de rol

`POST /api/user/0/rol`

```JSON
{
  "id_rol": 0
}

```
