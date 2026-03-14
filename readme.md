# NOTESTACK

NOTESTACK es una aplicación web ligera diseñada para organizar notas técnicas y cuadernos digitales orientados a estudiantes de ingeniería en sistemas.

El objetivo del proyecto es crear un sistema de conocimiento personal donde sea posible almacenar, organizar y consultar apuntes de diferentes áreas como programación, redes, ciberseguridad y sistemas operativos.

---

## Características

* Gestión de cuadernos
* Creación y edición de notas
* Organización por etiquetas
* Búsqueda rápida
* Almacenamiento local
* Interfaz minimalista enfocada en productividad

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* LocalStorage

---

## Arquitectura

La aplicación sigue una arquitectura modular basada en componentes:

UI → Controllers → Services → Storage

Esto permite mantener el código organizado y escalable.

---

## Estructura del proyecto

```
notestack/
│
├── index.html
├── README.md
│
├── css/
├── js/
│   ├── controllers/
│   ├── services/
│   └── utils/
│
├── components/
├── assets/
└── data/
```

---

## Entidades principales

### Notebook

Representa un cuaderno que agrupa varias notas.

### Note

Representa una nota individual asociada a un cuaderno.

---

## Futuras mejoras

* Editor Markdown
* Resaltado de sintaxis para código
* Sincronización en la nube
* Exportación a PDF
* Aplicación instalable (PWA)

---

## Propósito del proyecto

Este proyecto tiene como objetivo servir como sistema de gestión de conocimiento personal para estudios en ingeniería en sistemas, además de funcionar como práctica de desarrollo web.

---

## Licencia

MIT
