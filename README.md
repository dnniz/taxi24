# taxi24
Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando unasolución de marca blanca

Diagram DB
![2023-09-29_07-55-37](https://github.com/dnniz/taxi24/assets/26588181/bfe56d70-5676-4a32-8aa0-3bcf794e4768)

Pre-requisitos:
-   Postgresql v12 (min)
-   Postgis
-   PgAdmin 4
-   DBeaver (opcional)

Pasos de configuración

#1 Ejecución de SCRIPT creación y config BD

-   taxi24app\SCRIPTS\backup-database.sql

#2 Ejecución de SCRIPT configuración de Postgis

-   taxi24app\SCRIPTS\postgis-config.sql

#3 Ejecución de SCRIPT Backup BD

-   taxi24app\SCRIPTS\backup-database.sql

#4 Modificación de Conexion a BD

- Ubicar el archivo: taxi24app\src\infrastructure\infrastructure.module.ts

- Modificar e indicar las credenciales correctas de BD
    username: ''
    password: ''
    database: ''


Ejecución del proyecto

#1 Ejecutar el comando

-   npm i

#2 Ejecutar el comando

- npm run start:dev

#3  Para ejecución de Unit Test

- npm run test




