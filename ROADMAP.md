# NOTESTACK — Estado del Proyecto

Documento breve para reflejar solo el estado real actual del proyecto.

## Estado actual

NOTESTACK ya funciona como una SPA de notas con persistencia local.

Flujos disponibles:

* Crear cuadernos
* Renombrar cuadernos
* Eliminar cuadernos
* Crear notas
* Editar notas
* Eliminar notas
* Buscar notas
* Guardado automático en LocalStorage

## Estructura actual

```text
notestack/
├── index.html
├── readme.md
├── arquitectura.md
├── context.md
├── ROADMAP.md
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── controllers/
    │   └── noteController.js
    └── services/
        ├── storageService.js
        ├── noteService.js
        └── notebookService.js
```

## Estado técnico

Capas activas:

* UI en HTML y CSS
* Un controlador principal en JavaScript
* Servicios para notas, cuadernos y persistencia
* Base local en LocalStorage

## Checklist actual

```text
[x] storageService
[x] noteService
[x] notebookService
[x] renderizado de cuadernos
[x] renderizado de notas
[x] guardado automático
[x] búsqueda de notas
[x] eliminación de notas
[x] renombrado y eliminación de cuadernos
```

## Pendientes de cierre

Pendientes pequeños recomendados:

* Mantener documentación alineada
* Revisión visual y de accesibilidad básica
* Checklist de pruebas manuales
