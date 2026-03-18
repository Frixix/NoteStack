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