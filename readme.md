# NOTESTACK

NOTESTACK es una SPA ligera para organizar notas en cuadernos, construida con tecnologías web nativas.

## Lo que hace hoy

* Crear cuadernos
* Renombrar cuadernos
* Eliminar cuadernos y sus notas asociadas
* Crear notas
* Editar título y contenido
* Eliminar notas
* Buscar notas por título o contenido
* Guardar cambios automáticamente en LocalStorage

## Tecnologías

* HTML5
* CSS3
* JavaScript Vanilla
* LocalStorage

## Arquitectura

La aplicación sigue esta estructura:

UI -> Controller -> Services -> Storage

Archivos principales:

* `index.html`
* `css/style.css`
* `js/app.js`
* `js/controllers/noteController.js`
* `js/services/storageService.js`
* `js/services/noteService.js`
* `js/services/notebookService.js`

## Datos principales

### Notebook

```json
{
  "id": "uuid",
  "name": "Redes",
  "createdAt": "timestamp"
}
```

### Note

```json
{
  "id": "uuid",
  "title": "Modelo OSI",
  "content": "contenido de la nota...",
  "notebookId": "uuid",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Verificación manual

Checklist rápida para validar la app:

* Crear un cuaderno nuevo
* Renombrar un cuaderno
* Eliminar un cuaderno y confirmar que sus notas desaparecen
* Crear una nota
* Editar título y contenido
* Recargar la página y confirmar persistencia
* Buscar una nota por texto
* Eliminar una nota

## Propósito

El proyecto está pensado como práctica de desarrollo frontend y como pieza de portafolio con una arquitectura simple, clara y fácil de explicar.

## Licencia

MIT
