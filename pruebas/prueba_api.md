### Obtención de usuario

`GET /api/user/:id`

```JSON
[
  {
    "nombre": "Usuario Prueba 1",
    "telefono": "+34 161616 ",
    "correo": "prueba1@los_pilotos.cat",
    "contrasena": "hola1234"
  },
  ...
]

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

### Actualización de usuario

`PUT /api/user/:id`

```JSON
{
  "nombre": "Usuario Prueba 1 (Actualizado)",
  "telefono": "+34 161616",
}
```

### Eliminación de usuario

`DELETE /api/user/:id`

### Asignar ROL a USUARIO

`POST /api/user/:id/rol`

```JSON
{
  "id_rol": 0
}
```

### Eliminar ROL de USUARIO

`DELETE /api/user/:id/rol`

```JSON
{
  "id_rol": 0
}
```

### Actualizar ROL de USUARIO

`PUT /api/user/:id/rol`

```JSON
{
  "id_rol": 0
}
```

---

### Obtener anuncios

`GET /api/anuncio`

### Crear anuncio

`POST /api/anuncio`

```JSON
{
  "titulo": "¡Hemos actualizado nuestra APP!",
  "descripcion": "Como dice el anuncio, hemos actualizado nuestra app para ofrecer al usuario una mejor experiencia de movilización por la zona del circuito.",
  "prioridad": 10,
  "publico": 1,
  "id_autor": 1
}
```

### Actualizar anuncio

`PUT /api/anuncio/:id`

```JSON
{
  "titulo": "¡Hemos actualizado nuestra APP! (Actualizado)"
}
```

### Eliminar anuncio

`DELETE /api/anuncio/:id`

---

### Obtener puntos

`GET /api/punto`

### Registrar punto

`POST /api/punto`

```JSON
{
  "titulo": "Circuit de Barcelona-Catalunya",
  "descripcion": "Punto de control ubicado en la recta principal del circuito, sede del GP de España de Fórmula 1 y MotoGP.",
  "latitud": 41.57000000,
  "longitud": 2.26111100,
  "publico": true,
  "id_autor": 1
}
```

### Actualizar punto

`PUT /api/punto/:id`

```JSON
{
  "titulo": "Circuit de Barcelona-Catalunya (Actualizado)",
  "descripcion": "Punto de control ubicado en la recta principal del circuito, sede del GP de España de Fórmula 1 y MotoGP.",
  "latitud": 41.57000000,
  "longitud": 2.26111100,
  "publico": true,
  "id_autor": 1
}
```

### Eliminar punto

`DELETE /api/punto/:id`

---

### Obtener roles

`GET /api/rol`

### Crear nuevo rol

`POST /api/rol`

```JSON
{
  "titulo": "Administrador",
  "prioridad":0
}
```

### Actualizar rol

`PUT /api/rol/:id`

```JSON
{
  "titulo": "Administrador (Actualizado)",
  "prioridad":0
}
```

### Eliminar rol

`DELETE /api/rol/:id`
