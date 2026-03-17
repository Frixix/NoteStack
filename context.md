# NOTESTACK — Contexto del Usuario y Estado del Proyecto

Este documento reconstruye el **contexto técnico y objetivo del proyecto NOTESTACK** a partir del historial de conversación.
Su propósito es permitir **retomar el desarrollo en cualquier momento o en otro chat** sin perder el hilo del trabajo.

---

# 1. Contexto del Usuario

El usuario está desarrollando un proyecto personal llamado **NOTESTACK**.

El proyecto tiene como objetivo:

```
crear una aplicación web ligera para tomar notas interconectadas
```

Inspirada en herramientas de conocimiento personal como:

* Obsidian

El proyecto forma parte de un **portafolio técnico**, por lo que se prioriza:

```
arquitectura clara
código simple
tecnologías nativas
explicabilidad del sistema
```

---

# 2. Objetivo del Proyecto

Construir una **Single Page Application (SPA)** que permita:

```
crear cuadernos
crear notas
editar notas
guardar automáticamente
interconectar notas
```

El sistema busca modelar **conocimiento interconectado**, no solo notas aisladas.

Ejemplo conceptual:

```
Redes
  ├─ TCP
  ├─ UDP
  └─ Modelo OSI
        └─ Seguridad de red
```

---

# 3. Tecnologías utilizadas

El proyecto utiliza **solo tecnologías web nativas**:

```
HTML5
CSS3
JavaScript (Vanilla)
LocalStorage
```

No se utilizan:

```
frameworks
bundlers
librerías pesadas
```

Esto se decidió para mantener el proyecto:

```
ligero
entendible
ideal para portafolio
```

---

# 4. Arquitectura del Sistema

La aplicación sigue una arquitectura modular simple:

```
UI
↓
Controllers
↓
Services
↓
Storage
```

Descripción de cada capa:

### UI

Interfaz construida en:

```
HTML
CSS
```

Componentes principales:

```
sidebar (cuadernos)
lista de notas
editor de nota
```

---

### Controllers

Gestionan interacción del usuario.

Ejemplos:

```
noteController
notebookController
```

Responsabilidades:

```
escuchar eventos
conectar UI con servicios
renderizar datos
```

---

### Services

Contienen la lógica de negocio.

Ejemplos:

```
noteService
notebookService
```

Responsabilidades:

```
crear notas
actualizar notas
eliminar notas
filtrar notas
```

---

### Storage

Responsable de persistencia.

Archivo principal:

```
storageService.js
```

Persistencia usando:

```
LocalStorage
```

Base de datos simulada:

```json
{
  "notebooks": [],
  "notes": []
}
```

---

# 5. Estructura actual del proyecto

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
│   │
│   ├── services/
│   │   ├── storageService.js
│   │   └── noteService.js
│   │
│   └── utils/
│
└── assets/
```

---

# 6. Estado actual del desarrollo

Componentes implementados:

```
✔ storageService
✔ noteService
✔ inicialización de aplicación
```

Capacidades actuales:

```
crear notas
guardar notas en LocalStorage
leer notas almacenadas
persistencia funcional
```

Prueba desde consola:

```javascript
noteService.createNote(
 "Modelo OSI",
 "Las capas del modelo...",
 "redes"
);
```

Luego:

```javascript
noteService.getAllNotes();
```

---

# 7. Decisiones técnicas importantes

Durante el desarrollo se tomaron decisiones clave.

### Sin ES Modules

Se decidió **no usar `import / export`** por ahora para evitar problemas de carga en navegador sin bundler.

Scripts cargados directamente:

```
storageService
noteService
app.js
```

---

### Identificadores de notas

Las notas utilizan:

```
UUID
```

Generado con:

```javascript
crypto.randomUUID()
```

Esto evita conflictos futuros.

---

### Editor basado en Markdown

Las notas se escriben en:

```
Markdown
```

Esto permitirá posteriormente soportar:

```
# títulos
listas
codigo
[[enlaces entre notas]]
```

---

### Enlaces entre notas

Se utilizará la sintaxis:

```
[[Nombre de nota]]
```

Ejemplo:

```
Ver también [[Modelo OSI]]
```

Estos enlaces serán detectados por un **parser de texto**.

---

# 8. Funcionalidades pendientes

Para completar la V1 del sistema aún faltan:

```
notebookService
noteController
notebookController
renderizado de notas
guardado automático
```

---

# 9. Funcionalidades planeadas

Versión futura:

```
parser Markdown
parser de enlaces [[nota]]
backlinks entre notas
grafo de conocimiento
```

Inspirado en:

* Obsidian

---

# 10. Próximo paso recomendado

El siguiente módulo a implementar es:

```
notebookService.js
```

Responsabilidades:

```
crear cuadernos
listar cuadernos
eliminar cuadernos
```

Estructura de cuaderno:

```json
{
  "id": "uuid",
  "name": "Redes",
  "createdAt": "timestamp"
}
```

---

# 11. Estado del proyecto (checklist)

```
[✔] Arquitectura definida
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

---

# 12. Objetivo final de la V1

Cuando la primera versión esté terminada, NOTESTACK permitirá:

```
crear cuadernos
crear notas
editar notas
guardar automáticamente
navegar entre notas
```

Esto resultará en una **SPA funcional de conocimiento personal**.

---

# 13. Cómo usar este documento

Este archivo permite:

```
retomar el desarrollo
continuar en otro chat
recordar decisiones técnicas
mantener el lineamiento del proyecto
```

Para continuar el desarrollo, basta con proporcionar este contexto al sistema o revisarlo antes de seguir programando.

---
