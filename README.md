# Juan Andres Bernal - Prueba tecnica Tyba

Implementacion de backend con servicio de autenticacion funcional mediante uso de cookies brindadas por `express session`.

La app cuenta con implementacion de tests mediante `postman` para su testeo, implementacion de `docker-compose` para su despliegue local. Cuenta on los requerimientos explicados en la prueba, cumpliendo con cada uno de los end points de forma correcta.

Para la funcionalidad de busqueda de restaurantes, se usa el API de google maps mediante un secreto insertado en el `docker-compose`. Como base de datos, se utiliza mongoDB.


# API Endpoints

## Health Check (No requiere autenticación)
- **GET** `/api/v1/health` - Verifica el estado del servicio

## Autenticación
- **POST** `/api/v1/register` - Registra un nuevo usuario
- **POST** `/api/v1/login` - Inicia sesión de usuario
- **POST** `/api/v1/logout` - Cierra sesión (requiere autenticación)

## Perfil de Usuario
- **GET** `/api/v1/profile` - Obtiene el perfil del usuario autenticado
- **GET** `/api/v1/emails` - Lista todos los emails registrados

## Historial de Actividad
- **GET** `/api/v1/historial` - Obtiene el historial de actividad del usuario autenticado
- **GET** `/api/v1/historialApp` - Obtiene todo el historial de actividad

## Restaurantes
- **POST** `/api/v1/restaurants` - Busca restaurantes cercanos a coordenadas específicas (requiere autenticación)
  - Body: `{ "latitud": number, "longitud": number }`

Cada uno de los respectivos `Endpoints` cuenta con el middleware de `tracking` al igual que, la verificacion de los datos y la correspondencia a los modelos definidos en la base de datos Mongo

## Funcionamiento de Cookies para la autenticacion de forma exitosa

La aplicación utiliza cookies de sesión httpOnly de Express para autenticar a los usuarios, con una duración de 24 horas, y se elimina al hacer logout. El middleware de autenticación verifica la existencia de la sesión activa antes de permitir el acceso a los endpoints protegidos.

## Postman

Se añade coleccion de postman con todos los endpoints funcionales para cada uno delos casos.

## Automatizacion de pruebas.

Se crea un pequeño test del endpoint de health con el fin de crear una `Github Action` y correr los tests cada vez que se hace un commit o se abre un PR. Esto se evidencia en el siguiente PR: https://github.com/JuanBernal13/Prueba-Tyba-Juan-Bernal/pull/2

## Ejecutar la aplicación con Docker

```bash
# Construir y ejecutar
docker-compose up --build

# O usando los scripts del package.json
npm run docker:reset
npm run docker:up
npm run docker:down
```

La aplicación se ejecuta en `http://localhost:3000`

## Secretos

Los secretos se encuentran en el `docker-compose` para iniciar el despliegue de la aplicacion.
## Info

- Todos los endpoints (excepto `/health`, `/register` y `/login`) requieren autenticación. No se tiene tracking del endpoint `/health`
- La aplicación incluye tracking automático de todas las actividades de usuarios autenticados. Esto se realiza mediante un middleware que se encuentra presente para todos los endpoints
