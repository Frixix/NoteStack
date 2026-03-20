// notebookService.js

const notebookService = {

    getAllNotebooks() {
        const db = storageService.getDB();
        return db.notebooks;
    },

    createNotebook(name) {
        const db = storageService.getDB();

        const newNotebook = {
            id: crypto.randomUUID(),
            name: name,
            createdAt: new Date().toISOString()
        };

        db.notebooks.push(newNotebook);
        storageService.saveDB(db);

        return newNotebook;
    },

    updateNotebook(id, updates) {
        const db = storageService.getDB();
        const notebookIndex = db.notebooks.findIndex(nb => nb.id === id);

        if (notebookIndex === -1) {
            return null;
        }

        db.notebooks[notebookIndex] = {
            ...db.notebooks[notebookIndex],
            ...updates
        };

        storageService.saveDB(db);

        return db.notebooks[notebookIndex];
    },

    deleteNotebook(id) {
        const db = storageService.getDB();

        db.notebooks = db.notebooks.filter(nb => nb.id !== id);

        // 🔥 también eliminar notas relacionadas
        db.notes = db.notes.filter(note => note.notebookId !== id);

        storageService.saveDB(db);
    },

    getNotebookById(id) {
        const db = storageService.getDB();
        return db.notebooks.find(nb => nb.id === id);
    }

};

// Exponer globalmente
window.notebookService = notebookService;
