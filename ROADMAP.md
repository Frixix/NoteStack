# NOTESTACK — Development Roadmap

Este documento sirve como **seguimiento del desarrollo de NOTESTACK**.
Define el estado actual del proyecto, las funcionalidades pendientes y el orden recomendado de implementación.

---

# 1. Estado actual del proyecto

Arquitectura implementada:

```
UI (HTML + CSS)
     │
     ▼
Controllers (JS)
     │
     ▼
Services
     │
     ▼
Storage (LocalStorage)
```

Servicios ya creados:

```
storageService.js
noteService.js
```

Funcionalidades disponibles actualmente:

* Inicialización de base de datos en LocalStorage
* Creación de notas desde consola
* Lectura de notas almacenadas
* Persistencia de datos

Esto significa que **la capa de datos ya funciona**.

---

# 2. Arquitectura actual del proyecto

```
notestack/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   │
│   ├── controllers/
│   │   ├── noteController.js
│   │   └── notebookController.js
│   │
│   ├── services/
│   │   ├── noteService.js
│   │   ├── notebookService.js
│   │   └── storageService.js
│   │
│   └── utils/
│       ├── markdownParser.js
│       └── linkParser.js
│
└── assets/
```

Actualmente solo están implementados:

```
storageService
noteService
```

---

# 3. Funcionalidades mínimas para la V1

La primera versión funcional debe permitir:

```
crear cuadernos
crear notas
editar notas
eliminar notas
guardar notas
mostrar notas en la interfaz
```

Todo persistido en **LocalStorage**.

---

# 4. Orden recomendado de desarrollo

## Paso 1 — notebookService

Crear el servicio encargado de manejar cuadernos.

Funciones necesarias:

```
createNotebook(name)
getAllNotebooks()
deleteNotebook(id)
```

Estructura del objeto:

```json
{
  "id": "uuid",
  "name": "Redes",
  "createdAt": "timestamp"
}
```

---

## Paso 2 — noteController

Conectar la UI con el sistema de notas.

Responsabilidades:

```
escuchar eventos del editor
crear notas
actualizar notas
cargar notas
mostrar lista de notas
```

Eventos principales:

```
click -> botón nueva nota
click -> seleccionar nota
input -> editar contenido
```

---

## Paso 3 — notebookController

Controlar la barra lateral.

Responsabilidades:

```
crear cuadernos
listar cuadernos
seleccionar cuaderno
```

Interacción con:

```
#new-notebook
#notebook-list
```

---

## Paso 4 — Renderizado de notas

Crear funciones para mostrar notas en la interfaz.

Ejemplo:

```
renderNoteList()
renderNoteEditor()
```

Esto conecta:

```
noteService
↓
UI
```

---

## Paso 5 — Guardado automático

Cada vez que el usuario escriba:

```
input en textarea
```

el sistema debe ejecutar:

```
noteService.updateNote()
```

Esto permite:

```
guardado automático
```

---

# 5. Funcionalidades avanzadas (V2)

Una vez completada la V1 se pueden agregar:

### Markdown

Parsear contenido usando librería Markdown.

Archivo:

```
utils/markdownParser.js
```

---

### Enlaces entre notas

Detectar enlaces:

```
[[Nombre de nota]]
```

Archivo:

```
utils/linkParser.js
```

---

### Backlinks

Mostrar qué notas referencian a otra.

Ejemplo:

```
Referenciado por:
- TCP
- UDP
```

---

### Grafo de conocimiento

Visualizar las conexiones entre notas.

Esto permitiría algo similar a:

Obsidian

---

# 6. Mejoras futuras

Características opcionales para versiones posteriores:

```
modo oscuro
buscador de notas
etiquetas
exportación Markdown
importación de notas
IndexedDB en lugar de LocalStorage
sincronización en la nube
```

---

# 7. Decisiones de arquitectura

Para mantener el proyecto ligero se decidió:

* No usar frameworks
* No usar bundlers
* No usar módulos ES (por ahora)
* Usar LocalStorage para persistencia
* Calcular enlaces entre notas en tiempo de ejecución

Esto mantiene el sistema:

```
simple
ligero
fácil de explicar en portafolio
```

---

# 8. Objetivo final de la V1

Una vez terminados los pasos anteriores, la aplicación permitirá:

```
crear cuadernos
crear notas
editar notas
guardar automáticamente
navegar entre notas
```

Con esto **NOTESTACK será una SPA funcional de gestión de conocimiento personal**.

---

# 9. Estado del proyecto

```
[✔] storageService
[✔] noteService
[ ] notebookService
[ ] noteController
[ ] notebookController
[ ] renderizado de notas
[ ] guardado automático
[ ] markdown parser
[ ] link parser
```
