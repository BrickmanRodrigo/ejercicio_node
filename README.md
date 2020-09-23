# ejercicio_node
---
## How to run
#### Start DB
```bash
npm run start:db
# OR
docker-compose up
```
#### Start application
```bash
npm run start
```
---
## POST Examples
#### /profes
```json
{
    "nombre":"Nombre Profesor",
    "edad": 43,
    "matricula": "A312SAH"
}
```
#### /clases
```json
{
    "nombre":"Nombre Clase",
    "horario": "9 a 14",
    "profesor_id": 1
}
```
#### /alumnos
```json
{
    "nombre":"Nombre Alumno",
    "edad": 15,
    "clase_id": [1,2]
}
```