import storageService from "./services/storageService.js";


function initApp(){

    storageService.initDB();

    console.log("NOTESTACK iniciado");

}


initApp();