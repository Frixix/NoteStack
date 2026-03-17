// noteController.js

// Obtener elementos del DOM
const newNoteBtn = document.getElementById("new-note");
const noteList = document.getElementById("note-list");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");

// Estado actual
let currentNoteId = null;

// Inicializar controller
function initNoteController() {
    renderNotes();

    // Evento: crear nueva nota
    newNoteBtn.addEventListener("click", () => {
        const newNote = noteService.createNote(
            "Nueva nota",
            "",
            "general"
        );

        renderNotes();
        loadNote(newNote.id);
    });

    // Evento: guardar cambios (autosave básico)
    noteTitle.addEventListener("input", saveCurrentNote);
    noteContent.addEventListener("input", saveCurrentNote);
}

// Renderizar lista de notas
function renderNotes() {
    const notes = noteService.getAllNotes();

    noteList.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.title || "Sin título";

        li.addEventListener("click", () => {
            loadNote(note.id);
        });

        noteList.appendChild(li);
    });
}

// Cargar una nota en el editor
function loadNote(id) {
    const note = noteService.getNoteById(id);

    if (!note) return;

    currentNoteId = id;

    noteTitle.value = note.title;
    noteContent.value = note.content;
}

// Guardar cambios de la nota actual
function saveCurrentNote() {
    if (!currentNoteId) return;

    noteService.updateNote(currentNoteId, {
        title: noteTitle.value,
        content: noteContent.value
    });

    renderNotes(); // para actualizar títulos en la lista
}

// Exportar inicializador
window.noteController = {
    init: initNoteController
};