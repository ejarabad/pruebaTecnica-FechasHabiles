# Calculadora de Fechas Hábiles

## Descripción

Esta es una API REST desarrollada en Node.js utilizando TypeScript que permite calcular fechas futuras al sumar días y horas hábiles, excluyendo fines de semana y días festivos colombianos. El proyecto está diseñado para aplicaciones que requieren programar eventos, plazos o entregas considerando únicamente días laborables, con un horario de trabajo estándar de 8:00 a 12:00 y 13:00 a 17:00 (8 horas diarias).

La API obtiene automáticamente los días festivos desde una fuente externa (API de Capta) y opera en la zona horaria de Bogotá (America/Bogota). Es una herramienta útil para sistemas de gestión de proyectos, calendarios corporativos o cualquier aplicación que necesite cálculos de tiempo laboral precisos.

## Características

- **Cálculo de días hábiles**: Suma días laborables a una fecha inicial, omitiendo sábados, domingos y festivos.
- **Cálculo de horas hábiles**: Suma horas dentro del horario laboral (8:00-12:00 y 13:00-17:00), avanzando a días hábiles siguientes cuando sea necesario.
- **Integración con festivos**: Obtiene automáticamente la lista de días festivos colombianos desde una API externa.
- **Soporte de zona horaria**: Todas las operaciones se realizan en la zona horaria de Bogotá.
- **Validación de entrada**: Verifica parámetros de entrada y devuelve errores descriptivos en caso de datos inválidos.
- **Respuestas JSON**: Formato consistente para respuestas exitosas y de error.
- **Arquitectura modular**: Código organizado en servicios reutilizables y interfaces TypeScript.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu entorno local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/ejarabad/pruebaTecnica-FechasHabiles.git
   cd pruebaTecnica-FechasHabiles
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Compila el proyecto** (opcional, se hace automáticamente en desarrollo):
   ```bash
   npx tsc
   ```

El proyecto utiliza TypeScript, por lo que los archivos fuente están en `src/` y se compilan a `dist/`.

## Uso/Ejecución

### Ejecución en Modo Desarrollo

Para ejecutar el servidor en modo desarrollo con recarga automática:
```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3050` (puerto configurable via variable de entorno `PORT`).

### Ejecución en Producción

1. Compila el proyecto:
   ```bash
   npx tsc
   ```

2. Ejecuta el servidor compilado:
   ```bash
   node dist/index.js
   ```

### Uso de la API

La API expone un único endpoint `GET /calculate-date` que acepta parámetros de consulta.

**Parámetros de consulta:**
- `days` (opcional): Número entero de días hábiles a sumar (mínimo 0).
- `hours` (opcional): Número entero de horas hábiles a sumar (mínimo 0).
- `date` (opcional): Fecha inicial en formato ISO 8601 (ej: `2025-10-01T10:00:00Z`). Si no se proporciona, usa la fecha actual.

**Ejemplos de uso:**

```bash
# Sumar 5 días hábiles a la fecha actual
curl "http://localhost:3050/calculate-date?days=5"

# Sumar 10 horas hábiles a una fecha específica
curl "http://localhost:3050/calculate-date?hours=10&date=2025-10-01T09:00:00Z"

# Sumar días y horas
curl "http://localhost:3050/calculate-date?days=2&hours=8&date=2025-10-01"
```

**Nota:** Al menos uno de `days` o `hours` debe ser proporcionado y mayor que 0.

## Funciones y Módulos

### Servicio Principal: `dateCalculator` ([`src/services/dateCalculator.ts:7`](relative/file/path.ext))

**Descripción**: Función principal que coordina el cálculo de fechas. Obtiene los festivos, ajusta la fecha inicial al siguiente día hábil si es necesario, y suma días y horas hábiles.

**Parámetros de entrada**:
- `params: Calculation` - Objeto con:
  - `days: number` - Días hábiles a sumar.
  - `hours: number` - Horas hábiles a sumar.
  - `startDate: Date` - Fecha inicial.

**Lógica interna**:
1. Obtiene lista de festivos.
2. Ajusta fecha inicial al siguiente día hábil.
3. Suma días hábiles si `days > 0`.
4. Suma horas hábiles si `hours > 0`.

### Servicio: `addWorkingDay` ([`src/services/addWorkingDay.ts:3`](relative/file/path.ext))

**Descripción**: Suma días hábiles a una fecha, omitiendo fines de semana y festivos.

**Parámetros de entrada**:
- `startDate: Date` - Fecha inicial.
- `daysToAdd: number` - Número de días hábiles a sumar.
- `holyDays: Date[]` - Array de fechas festivas.

**Lógica interna**: Avanza día a día, incrementando el contador solo en días que no sean fin de semana ni festivos.


### Servicio: `addWorkingHours` ([`src/services/addWorkingHour.ts:10`](relative/file/path.ext))

**Descripción**: Suma horas hábiles considerando horario laboral de 8:00-12:00 y 13:00-17:00.

**Parámetros de entrada**:
- `date: Date` - Fecha y hora inicial.
- `hours: number` - Horas hábiles a sumar.
- `holidays: Date[]` - Array de fechas festivas.

**Lógica interna**:
1. Calcula minutos restantes (hours * 60).
2. Para cada bloque horario (mañana o tarde), calcula minutos disponibles.
3. Avanza tiempo o día según sea necesario.
4. Si se acaba el día, busca siguiente día hábil.

### Servicio: `findNextWorkingDay` ([`src/services/findNextWorkingDay.ts:6`](relative/file/path.ext))

**Descripción**: Encuentra el siguiente día hábil a partir de una fecha, ajustando la hora al inicio del horario laboral.

**Parámetros de entrada**:
- `date: Date` - Fecha inicial.
- `holidays: Date[]` - Array de fechas festivas.

**Lógica interna**:
- Avanza días hasta encontrar uno que no sea fin de semana ni festivo.
- Ajusta hora: si < 8:00 → 8:00, si =12:00 → 13:00, si ≥17:00 → siguiente día 8:00.

### Utilidad: `getHolidays` ([`src/utils/holidayFetcher.ts:11`](relative/file/path.ext))

**Descripción**: Obtiene la lista de días festivos colombianos desde API externa, con caché.

**Parámetros de entrada**: Ninguno.

**Lógica interna**: Realiza petición HTTP a `https://content.capta.co/Recruitment/WorkingDays.json`, parsea y cachea el resultado.

### Interfaces

- `Calculation` ([`src/interface/Calculation.ts:1`](relative/file/path.ext)): Define parámetros para cálculos.
- `SuccessResponse` ([`src/interface/SuccesResponse.ts:1`](relative/file/path.ext)): Estructura respuesta exitosa.
- `ErrorResponse` ([`src/interface/Error.ts:1`](relative/file/path.ext)): Estructura respuesta de error.

### Log de Consola en Desarrollo
```
Server is running on port 3050
```

## Estructura del Proyecto

```
pruebaTecnica-FechasHabiles/
├── src/
│   ├── index.ts                 # Punto de entrada, configuración Express
│   ├── controller/
│   │   └── dateController.ts    # Controlador de la ruta /calculate-date
│   ├── interface/
│   │   ├── Calculation.ts       # Interfaz para parámetros de cálculo
│   │   ├── Error.ts             # Interfaz para respuestas de error
│   │   └── SuccesResponse.ts    # Interfaz para respuestas exitosas
│   ├── services/
│   │   ├── dateCalculator.ts    # Servicio principal de cálculo
│   │   ├── addWorkingDay.ts     # Servicio para sumar días hábiles
│   │   ├── addWorkingHour.ts    # Servicio para sumar horas hábiles
│   │   └── findNextWorkingDay.ts # Servicio para encontrar siguiente día hábil
│   ├── utils/
│   │   └── holidayFetcher.ts    # Utilidad para obtener festivos
│   └── test/
│       ├── holidayTest.ts       # Test manual para obtener festivos
│       ├── testFindWorkingDay.ts # Test manual para findNextWorkingDay
│       ├── workingDaysTest.ts   # Test manual para addWorkingDay
│       └── workingHoursTest.ts  # Test manual para addWorkingHours
├── dist/                        # Archivos compilados (generado)
├── package.json                 # Configuración del proyecto y dependencias
├── tsconfig.json                # Configuración TypeScript
├── .gitignore                   # Archivos ignorados por Git
└── README.md                    # Este archivo
```

## Dependencias y Librerías

### Dependencias de Producción
- **express (^5.1.0)**: Framework web para Node.js, maneja rutas y middleware.
- **axios (^1.12.2)**: Cliente HTTP para obtener datos de la API de festivos.
- **date-fns (^4.1.0)**: Librería para manipulación de fechas (addDays, isWeekend, etc.).
- **date-fns-tz (^3.2.0)**: Extensión de date-fns para soporte de zonas horarias.

### Dependencias de Desarrollo
- **typescript (^5.9.2)**: Compilador TypeScript.
- **@types/express (^5.0.3)**: Definiciones TypeScript para Express.
- **@types/node (^24.5.2)**: Definiciones TypeScript para Node.js.
- **nodemon (^3.1.10)**: Herramienta para recarga automática en desarrollo.
- **ts-node (^10.9.2)**: Ejecutor de TypeScript sin compilación previa.

## Pruebas

El proyecto incluye pruebas manuales básicas en la carpeta `src/test/`. Estas pruebas no son automatizadas y sirven para verificar funcionalidades individuales.


## Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios siguiendo los estándares de código.
4. Añade pruebas para nuevas funcionalidades.
5. Envía un Pull Request con descripción detallada.

### Estándares de Código
- Usa TypeScript estrictamente tipado.
- Sigue convenciones de nomenclatura camelCase.
- Mantén funciones pequeñas y con responsabilidad única.
- Documenta funciones complejas con JSDoc.
- Ejecuta `npx tsc` antes de commits para verificar compilación.

## Contacto/Autor

**Autor**: [Ernesto Jaraba Donado](https://github.com/ejarabad)

**Repositorio**: [https://github.com/ejarabad/pruebaTecnica-FechasHabiles](https://github.com/ejarabad/pruebaTecnica-FechasHabiles)

**Issues**: [https://github.com/ejarabad/pruebaTecnica-FechasHabiles/issues](https://github.com/ejarabad/pruebaTecnica-FechasHabiles/issues)

Para soporte o preguntas, crea un issue en el repositorio o contacta al autor.