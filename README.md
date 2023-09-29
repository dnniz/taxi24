# taxi24

Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando una solución de marca blanca.

## Diagrama DB
![Diagrama DB](https://github.com/dnniz/taxi24/assets/26588181/bfe56d70-5676-4a32-8aa0-3bcf794e4768)

## Pre-requisitos
- Postgresql v12 (mínimo)
- Postgis
- PgAdmin 4
- DBeaver (opcional)

## Pasos de configuración

### 1. Ejecución de SCRIPT creación y config BD

```shell
taxi24app\SCRIPTS\backup-database.sql
```

### 2. Ejecución de SCRIPT configuración de Postgis
```shell
taxi24app\SCRIPTS\postgis-config.sql
```
### 3. Ejecución de SCRIPT Backup BD

```shell
taxi24app\SCRIPTS\backup-database.sql
```

### 4. Modificación de Conexion a BD

- Ubicar el archivo:

```shell
taxi24app\src\infrastructure\infrastructure.module.ts
```

- Modificar e indicar las credenciales correctas de BD
- 
```shell
username: ''
password: ''
database: ''
```

## Ejecución del proyecto

### 1. Ejecutar el comando
```shell
npm i
```
### 2. Ejecutar el comando

```shell
npm run start:dev
```

### 3.  Para ejecución de Unit Test
```shell
npm run test
```

## Consideraciones:

### 1. Pruebas para listado de conductores cercanos.

- Ejecutar siguiente SCRIPT, para simular la actualización de la ubicación actual de los DRIVERS.

```shell
UPDATE public.history_driver_location
SET location_datetime = CURRENT_TIMESTAMP
where location_datetime < CURRENT_TIMESTAMP
```


