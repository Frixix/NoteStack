const STORAGE_KEY = "notestack_db";


function initDB(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(!data){

        const initialData = {
            notebooks: [],
            notes: []
        };

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialData)
        );

    }

}


function getDB(){

    const data = localStorage.getItem(STORAGE_KEY);

    return JSON.parse(data);

}


function saveDB(data){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


function resetDB(){

    const emptyDB = {
        notebooks: [],
        notes: []
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(emptyDB)
    );

}


export default {
    initDB,
    getDB,
    saveDB,
    resetDB
};