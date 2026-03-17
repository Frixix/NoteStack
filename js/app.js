function initApp() {

    console.log("NOTESTACK iniciado");

    const db = storageService.getDB();
    console.log("Base de datos cargada:", db);

    // 🔥 Inicializar controller
    noteController.init();

}

initApp();