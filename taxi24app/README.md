
## Documentación Funcional - Entidades

## [Feature] Near by Drivers :

### Driver Assignment: 
   - Esta entidad representa a un conductor en ejecución de sus labores.
   - Donde se tiene enlazado al driver y vehicle_unit como parte de un proceso de asignación.
   - [available] Se indica que está disponible mediante un flag.
   - [datetime_assignment] Indica el horario que corresponde para la labor de conducción.

### History Driver Location:
  - Esta es la representación del seguimiento en "tiempo real" de la ubicación del conductor.
  - [location_datetime] Es la fecha y hora de la ultima actualización de la ubicación del conductor,
     para este caso se debe considerar que desde el aplicativo del conductor se comunique cada 2 minutos
     una actualización con las coordenadas del conductor.
  - Para la busqueda de los Conductores cercanos se toma en cuenta la ultima actualización del conductor y sus coordenadas
    considerando que sólo se tomarán en cuenta los conductores que tiene una actualización mayo o igual al tiempo actual
    menos 2 minutos, para ser considerado como habil para un viaje, más no disponible. Posteriormente se filtra si se encuentra
    disponible con el flag [available].
  - [coordenate] Ubicación del conductor.

### Trip:
  - Esta entidad es la que permite generar y hacer seguimiento de las solicitudes de viaje y sus diferentes estados.
  - [state]:
      -     PENDING
      -     IN_PROGRESS,
      -     COMPLETE
  - [gps] Propiedades para las coordenas de salida y destino.


## License

Nest is [MIT licensed](LICENSE).
