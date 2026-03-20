const noteService = (function () {

    function getAllNotes() {
        const db = storageService.getDB();
        return db.notes;
    }

    function getNoteById(id) {
        const db = storageService.getDB();
        return db.notes.find(note => note.id === id) || null;
    }

    function getNotesByNotebookId(notebookId) {
        const db = storageService.getDB();
        return db.notes.filter(note => note.notebookId === notebookId);
    }

    function createNote(title, content, notebookId) {

        const db = storageService.getDB();

        const newNote = {
            id: crypto.randomUUID(),
            title: title || "Nueva nota",
            content: content || "",
            notebookId: notebookId || null,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        db.notes.push(newNote);

        storageService.saveDB(db);

        return newNote;
    }

    function updateNote(id, updates) {
        const db = storageService.getDB();
        const noteIndex = db.notes.findIndex(note => note.id === id);

        if (noteIndex === -1) {
            return null;
        }

        db.notes[noteIndex] = {
            ...db.notes[noteIndex],
            ...updates,
            updatedAt: Date.now()
        };

        storageService.saveDB(db);

        return db.notes[noteIndex];
    }

    function deleteNote(id) {
        const db = storageService.getDB();
        const noteExists = db.notes.some(note => note.id === id);

        if (!noteExists) {
            return false;
        }

        db.notes = db.notes.filter(note => note.id !== id);
        storageService.saveDB(db);

        return true;
    }

    return {
        getAllNotes,
        getNoteById,
        getNotesByNotebookId,
        createNote,
        updateNote,
        deleteNote
    };

})();
