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
const notesEmptyTitle = document.getElementById("notes-empty-title");
const notesEmptyMessage = document.getElementById("notes-empty-message");
const deleteNoteBtn = document.getElementById("delete-note");

const newNotebookBtn = document.getElementById("new-notebook");
const notebookList = document.getElementById("notebook-list");
const notebookForm = document.getElementById("notebook-form");
const notebookNameInput = document.getElementById("notebook-name-input");
const saveNotebookBtn = document.getElementById("save-notebook");
const cancelNotebookBtn = document.getElementById("cancel-notebook");
const renameNotebookBtn = document.getElementById("rename-notebook");
const deleteNotebookBtn = document.getElementById("delete-notebook");

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
    renameNotebookBtn.addEventListener("click", handleRenameNotebook);
    deleteNotebookBtn.addEventListener("click", handleDeleteNotebook);
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

    deleteNoteBtn.addEventListener("click", handleDeleteNote);

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

    updateNotebookActionState();
}

// Renderizar notas (filtradas por cuaderno)
function renderNotes() {
    const notes = getVisibleNotes();

    noteList.innerHTML = "";
    renderEmptyState(notes.length === 0);
    updateDeleteButtonState();

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
    updateDeleteButtonState();
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
    const visibleNotes = getVisibleNotes();

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

function handleRenameNotebook() {
    if (!currentNotebookId) {
        return;
    }

    const activeNotebook = notebookService.getNotebookById(currentNotebookId);

    if (!activeNotebook) {
        ensureActiveNotebook();
        renderNotebooks();
        syncEditorWithSelection();
        return;
    }

    const nextName = window.prompt("Nuevo nombre del cuaderno:", activeNotebook.name);

    if (nextName === null) {
        return;
    }

    const trimmedName = nextName.trim();

    if (!trimmedName) {
        window.alert("El nombre del cuaderno no puede estar vacio.");
        return;
    }

    notebookService.updateNotebook(currentNotebookId, {
        name: trimmedName
    });

    renderNotebooks();
}

function handleDeleteNotebook() {
    if (!currentNotebookId) {
        return;
    }

    const activeNotebook = notebookService.getNotebookById(currentNotebookId);

    if (!activeNotebook) {
        ensureActiveNotebook();
        renderNotebooks();
        syncEditorWithSelection();
        return;
    }

    const confirmed = window.confirm(
        `Eliminar el cuaderno "${activeNotebook.name}" y todas sus notas?`
    );

    if (!confirmed) {
        return;
    }

    const notebooks = notebookService.getAllNotebooks();
    const currentNotebookIndex = notebooks.findIndex(nb => nb.id === currentNotebookId);

    notebookService.deleteNotebook(currentNotebookId);

    const remainingNotebooks = notebookService.getAllNotebooks();
    const nextNotebook = remainingNotebooks[currentNotebookIndex] || remainingNotebooks[currentNotebookIndex - 1] || null;

    currentNotebookId = nextNotebook ? nextNotebook.id : null;
    currentNoteId = null;
    clearSearch();

    renderNotebooks();
    renderNotes();
    syncEditorWithSelection();
}

function handleDeleteNote() {
    if (!currentNoteId) {
        return;
    }

    const noteToDelete = noteService.getNoteById(currentNoteId);

    if (!noteToDelete) {
        syncEditorWithSelection();
        return;
    }

    const confirmed = window.confirm(`Eliminar la nota "${noteToDelete.title || "Sin titulo"}"?`);

    if (!confirmed) {
        return;
    }

    const visibleNotes = getVisibleNotes();
    const deletedNoteIndex = visibleNotes.findIndex(note => note.id === currentNoteId);
    const deletedNoteId = currentNoteId;

    noteService.deleteNote(deletedNoteId);

    const remainingVisibleNotes = getVisibleNotes().filter(note => note.id !== deletedNoteId);
    const nextNote = remainingVisibleNotes[deletedNoteIndex] || remainingVisibleNotes[deletedNoteIndex - 1] || null;

    currentNoteId = nextNote ? nextNote.id : null;

    renderNotes();

    if (nextNote) {
        loadNote(nextNote.id);
        return;
    }

    clearEditor();
}

function matchesSearch(note, term) {
    const title = note.title.toLowerCase();
    const content = note.content.toLowerCase();

    return title.includes(term) || content.includes(term);
}

function getVisibleNotes() {
    let notes = currentNotebookId
        ? noteService.getNotesByNotebookId(currentNotebookId)
        : noteService.getAllNotes();

    if (searchTerm) {
        notes = notes.filter(note => matchesSearch(note, searchTerm));
    }

    return notes;
}

function updateDeleteButtonState() {
    deleteNoteBtn.disabled = !currentNoteId;
}

function updateNotebookActionState() {
    const hasActiveNotebook = Boolean(currentNotebookId);
    renameNotebookBtn.disabled = !hasActiveNotebook;
    deleteNotebookBtn.disabled = !hasActiveNotebook;
}

function clearSearch() {
    searchTerm = "";
    noteSearch.value = "";
}

function renderEmptyState(isEmpty) {
    if (!isEmpty) {
        notesEmptyState.classList.add("hidden");
        return;
    }

    const state = getEmptyStateContent();

    notesEmptyTitle.textContent = state.title;
    notesEmptyMessage.textContent = state.message;
    notesEmptyState.classList.remove("hidden");
}

function getEmptyStateContent() {
    const notebooks = notebookService.getAllNotebooks();
    const notesInCurrentNotebook = currentNotebookId
        ? noteService.getNotesByNotebookId(currentNotebookId)
        : noteService.getAllNotes();

    if (notebooks.length === 0) {
        return {
            title: "Aun no tienes cuadernos",
            message: "Crea tu primer cuaderno para empezar a organizar tus notas."
        };
    }

    if (searchTerm && notesInCurrentNotebook.length === 0) {
        return {
            title: "Este cuaderno aun esta vacio",
            message: "Crea una nota nueva en este cuaderno para empezar a escribir."
        };
    }

    if (searchTerm) {
        return {
            title: "Sin resultados",
            message: `No encontramos notas para "${searchTerm}". Intenta con otra palabra clave.`
        };
    }

    return {
        title: "No hay notas en este cuaderno",
        message: "Crea una nueva nota para empezar a construir conocimiento aqui."
    };
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
