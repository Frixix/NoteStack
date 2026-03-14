# NOTESTACK

NOTESTACK es una aplicación web de notas inspirada en el concepto de conocimiento interconectado utilizado por herramientas como Obsidian.

Su objetivo es permitir la creación de **notas organizadas en cuadernos**, que puedan ser **interconectadas entre sí**, formando una red de conocimiento.

La aplicación está diseñada como una **Single Page Application (SPA)** desarrollada únicamente con tecnologías web nativas.

---

# 1. Tipo de aplicación

NOTESTACK es una:

**Web Application (SPA)**

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)

Sin frameworks por ahora.

## Arquitectura general

```
Frontend Web App
│
├── UI (HTML + CSS)
├── Lógica (JavaScript)
└── Persistencia (LocalStorage / IndexedDB)
```

La aplicación funciona directamente en navegadores modernos como:

* Chrome
* Edge
* Firefox


---

# 2. Principio central de NOTESTACK

En lugar de almacenar notas aisladas:

```
Nota A
Nota B
Nota C
```

NOTESTACK busca crear **conocimiento interconectado**.

Ejemplo conceptual:

```
Redes ───── TCP
   │
   └──── Modelo OSI
           │
           └──── Seguridad de red
```

Esto permite que las notas funcionen como una **red de conocimiento**, similar a un **grafo de ideas**.

---

# 3. Estructura conceptual de la aplicación

```
NOTESTACK
│
├── Cuadernos
│   ├── Redes
│   ├── Linux
│   ├── Programación
│   └── Ciberseguridad
│
├── Notas
│   ├── Crear nota
│   ├── Editar nota
│   └── Eliminar nota
│
└── Buscador
```

---

# 4. Arquitectura modular

La aplicación sigue una arquitectura modular simple:

```
Usuario
   │
   ▼
Interfaz (UI)
   │
   ▼
Controladores (JavaScript)
   │
   ▼
Servicios
   │
   ▼
Almacenamiento (LocalStorage / JSON)
```

---

# 5. Flujo de funcionamiento de la aplicación

Cuando un usuario crea o edita una nota:

```
Usuario escribe una nota
        │
        ▼
La UI captura el evento
        │
        ▼
noteController.js
        │
        ▼
noteService.js
        │
        ▼
storageService.js
        │
        ▼
LocalStorage
```

Este flujo mantiene separadas:

* interfaz
* lógica
* almacenamiento

---

# 6. Estructura del proyecto

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
│   │   └── storageService.js
│   │
│   └── utils/
│       └── helpers.js
│
├── components/
│   ├── sidebar.html
│   └── editor.html
│
├── assets/
│   ├── logo.png
│   └── icons/
│
└── data/
    └── schema.json
```

---

# 7. Entidades del sistema

## Notebook (Cuaderno)

Representa un contenedor de notas.

```json
{
  "id": "uuid",
  "name": "Redes",
  "createdAt": "timestamp"
}
```

---

## Note (Nota)

Representa una nota individual dentro de un cuaderno.

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

---

# 8. Objetivo del diseño

La arquitectura busca:

* simplicidad
* modularidad
* escalabilidad futura

Esto permitirá agregar posteriormente:

* enlaces entre notas
* grafo de conocimiento
* exportación Markdown
* búsqueda avanzada
* sincronización en la nube

---

# 9. Próximas funcionalidades

Características que pueden agregarse en futuras versiones:

* Enlaces entre notas (`[[nota]]`)
* Visualización de grafo de conocimiento
* Editor Markdown
* Sistema de etiquetas
* Exportación e importación de notas
* Sincronización con la nube
