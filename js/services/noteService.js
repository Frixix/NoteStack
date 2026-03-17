const noteService = (function () {

    function getAllNotes() {
        const db = storageService.getDB();
        return db.notes;
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

    return {
        getAllNotes,
        createNote
    };

})();