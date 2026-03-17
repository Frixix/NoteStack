function initApp() {

    console.log("NOTESTACK iniciado");

    // Verificamos si la base de datos existe
    const db = storageService.getDB();

    console.log("Base de datos cargada:", db);

}

initApp();