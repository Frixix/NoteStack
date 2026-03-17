const storageService = (function () {

    const STORAGE_KEY = "notestack_db";

    function getDB() {

        let db = localStorage.getItem(STORAGE_KEY);

        if (!db) {

            db = {
                notebooks: [],
                notes: []
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
        }

        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    function saveDB(db) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    }

    return {
        getDB,
        saveDB
    };

})();