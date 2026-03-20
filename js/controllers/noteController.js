// noteController.js

function debounce(func, delay) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Obtener elementos del DOM
const newNoteBtn = document.getElementById("new-note");
const noteList = document.getElementById("note-list");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const noteSearch = document.getElementById("note-search");
const notesEmptyState = document.getElementById("notes-empty-state");

const newNotebookBtn = document.getElementById("new-notebook");
const notebookList = document.getElementById("notebook-list");
const notebookForm = document.getElementById("notebook-form");
const notebookNameInput = document.getElementById("notebook-name-input");
const saveNotebookBtn = document.getElementById("save-notebook");
const cancelNotebookBtn = document.getElementById("cancel-notebook");

// Estado actual
let currentNoteId = null;
let currentNotebookId = null;
let searchTerm = "";

// Inicializar controller
function initNoteController() {
    ensureActiveNotebook();
    renderNotebooks();
    renderNotes();
    syncEditorWithSelection();

    // Crear cuaderno
    newNotebookBtn.addEventListener("click", openNotebookForm);
    saveNotebookBtn.addEventListener("click", handleCreateNotebook);
    cancelNotebookBtn.addEventListener("click", closeNotebookForm);
    notebookNameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleCreateNotebook();
        }

        if (event.key === "Escape") {
            closeNotebookForm();
        }
    });

    // Crear nota
    newNoteBtn.addEventListener("click", () => {
        ensureActiveNotebook(true);
        clearSearch();

        const newNote = noteService.createNote(
            "Nueva nota",
            "",
            currentNotebookId
        );

        renderNotes();
        loadNote(newNote.id);
    });

    noteSearch.addEventListener("input", (event) => {
        searchTerm = event.target.value.trim().toLowerCase();
        renderNotes();
        syncEditorWithSelection();
    });

    // Autosave optimizado
    const debouncedSave = debounce(saveCurrentNote, 500);

    noteTitle.addEventListener("input", debouncedSave);
    noteContent.addEventListener("input", debouncedSave);
}

// Renderizar cuadernos
function renderNotebooks() {
    const notebooks = notebookService.getAllNotebooks();

    notebookList.innerHTML = "";

    notebooks.forEach(nb => {
        const li = document.createElement("li");
        li.textContent = nb.name;

        li.addEventListener("click", () => {
            currentNotebookId = nb.id;
            renderNotes();
            renderNotebooks();
            syncEditorWithSelection();
        });

        if (nb.id === currentNotebookId) {
            li.classList.add("active");
        }

        notebookList.appendChild(li);
    });
}

// Renderizar notas (filtradas por cuaderno)
function renderNotes() {
    let notes = currentNotebookId
        ? noteService.getNotesByNotebookId(currentNotebookId)
        : noteService.getAllNotes();

    if (searchTerm) {
        notes = notes.filter(note => matchesSearch(note, searchTerm));
    }

    noteList.innerHTML = "";
    toggleNotesEmptyState(notes.length === 0);

    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.title || "Sin título";

        if (note.id === currentNoteId) {
            li.classList.add("active");
        }

        li.addEventListener("click", () => {
            loadNote(note.id);
        });

        noteList.appendChild(li);
    });
}

// Cargar nota
function loadNote(id) {
    const note = noteService.getNoteById(id);

    if (!note) return;

    currentNoteId = id;

    noteTitle.value = note.title;
    noteContent.value = note.content;

    renderNotes();
}

function clearEditor() {
    currentNoteId = null;
    noteTitle.value = "";
    noteContent.value = "";
}

function ensureActiveNotebook(createIfMissing = false) {
    const notebooks = notebookService.getAllNotebooks();

    if (notebooks.length === 0 && createIfMissing) {
        const newNotebook = notebookService.createNotebook("Mi cuaderno");
        currentNotebookId = newNotebook.id;
        renderNotebooks();
        return currentNotebookId;
    }

    const notebookExists = notebooks.some(nb => nb.id === currentNotebookId);

    if (!notebookExists) {
        currentNotebookId = notebooks[0]?.id || null;
    }

    return currentNotebookId;
}

function syncEditorWithSelection() {
    let visibleNotes = currentNotebookId
        ? noteService.getNotesByNotebookId(currentNotebookId)
        : noteService.getAllNotes();

    if (searchTerm) {
        visibleNotes = visibleNotes.filter(note => matchesSearch(note, searchTerm));
    }

    const currentNoteIsVisible = visibleNotes.some(note => note.id === currentNoteId);

    if (currentNoteIsVisible) {
        loadNote(currentNoteId);
        return;
    }

    if (visibleNotes.length > 0) {
        loadNote(visibleNotes[0].id);
        return;
    }

    clearEditor();
    renderNotes();
}

function openNotebookForm() {
    notebookForm.classList.remove("hidden");
    notebookNameInput.value = "";
    notebookNameInput.focus();
}

function closeNotebookForm() {
    notebookForm.classList.add("hidden");
    notebookNameInput.value = "";
}

function handleCreateNotebook() {
    const name = notebookNameInput.value.trim();

    if (!name) {
        notebookNameInput.focus();
        return;
    }

    const newNotebook = notebookService.createNotebook(name);
    currentNotebookId = newNotebook.id;
    currentNoteId = null;

    closeNotebookForm();
    renderNotebooks();
    renderNotes();
    syncEditorWithSelection();
}

function matchesSearch(note, term) {
    const title = note.title.toLowerCase();
    const content = note.content.toLowerCase();

    return title.includes(term) || content.includes(term);
}

function toggleNotesEmptyState(isEmpty) {
    notesEmptyState.classList.toggle("hidden", !isEmpty);
}

function clearSearch() {
    searchTerm = "";
    noteSearch.value = "";
}

// Guardar cambios
function saveCurrentNote() {
    if (!currentNoteId) return;

    noteService.updateNote(currentNoteId, {
        title: noteTitle.value,
        content: noteContent.value
    });

    updateActiveNoteTitle();
}

// Actualizar solo el título activo
function updateActiveNoteTitle() {
    const activeLi = noteList.querySelector(".active");

    if (activeLi) {
        activeLi.textContent = noteTitle.value || "Sin título";
    }
}

// Exportar
window.noteController = {
    init: initNoteController
};
