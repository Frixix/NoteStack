# NOTESTACK — Contexto Actual

Resumen corto del proyecto para retomarlo sin arrastrar planes viejos.

## Qué es hoy

NOTESTACK es una SPA ligera para gestionar cuadernos y notas con almacenamiento local.

## Qué tiene implementado

* Crear cuadernos
* Renombrar cuadernos
* Eliminar cuadernos y sus notas
* Crear notas
* Editar notas
* Eliminar notas
* Buscar notas
* Guardado automático
* Persistencia con LocalStorage

## Stack

* HTML5
* CSS3
* JavaScript Vanilla
* LocalStorage

## Estructura real

```text
notestack/
├── index.html
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

## Decisiones actuales

* Sin frameworks
* Sin bundlers
* Sin módulos ES
* Un controlador principal
* Persistencia simple con una estructura `{ notebooks, notes }`

## Estado resumido

```text
[x] estructura base
[x] persistencia local
[x] gestión de cuadernos
[x] gestión de notas
[x] búsqueda
[x] guardado automático
```

## Próximo criterio de cierre

Lo que queda es pulido:

* documentación consistente
* accesibilidad básica
* verificación manual final
