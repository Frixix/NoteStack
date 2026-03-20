# NOTESTACK — Arquitectura Actual

NOTESTACK es una SPA de notas y cuadernos construida con HTML, CSS y JavaScript Vanilla.

## Capas

```text
Usuario
  ↓
UI
  ↓
noteController
  ↓
Services
  ↓
storageService
  ↓
LocalStorage
```

## Responsabilidad por capa

UI:

* Muestra sidebar, lista de notas y editor
* Captura clics e inputs del usuario

Controller:

* Coordina renderizado
* Maneja selección de cuaderno y nota
* Conecta eventos con servicios

Services:

* `noteService.js` crea, actualiza, busca y elimina notas
* `notebookService.js` crea, renombra, consulta y elimina cuadernos
* `storageService.js` lee y guarda la base local

## Persistencia

La aplicación usa `LocalStorage` con una estructura simple:

```json
{
  "notebooks": [],
  "notes": []
}
```

## Estructura real del proyecto

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

## Flujo principal

Cuando el usuario edita una nota:

```text
input del usuario
-> noteController
-> noteService.updateNote()
-> storageService.saveDB()
-> LocalStorage
```

## Objetivo de esta arquitectura

* Mantener el proyecto simple
* Evitar dependencias innecesarias
* Hacer el código fácil de explicar y mantener
