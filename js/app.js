function setupNotesPanelToggle() {

    const notesPanel = document.getElementById("notes-panel");
    const toggleBtn = document.getElementById("toggle-notes-panel");
    const panelTab = document.getElementById("notes-panel-tab");

    if (!notesPanel || !toggleBtn || !panelTab) {
        return;
    }

    function syncState() {
        const collapsed = notesPanel.classList.contains("collapsed");
        toggleBtn.textContent = collapsed ? "Mostrar panel" : "Ocultar panel";
        toggleBtn.setAttribute("aria-label", collapsed ? "Mostrar panel de notas" : "Ocultar panel de notas");
        panelTab.setAttribute("aria-label", collapsed ? "Mostrar panel de notas" : "Ocultar panel de notas");
    }

    function togglePanel() {
        notesPanel.classList.toggle("collapsed");
        syncState();
    }

    toggleBtn.addEventListener("click", togglePanel);
    panelTab.addEventListener("click", togglePanel);
    panelTab.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePanel();
        }
    });

    syncState();
}

function initApp() {

    console.log("NOTESTACK iniciado");

    const db = storageService.getDB();
    console.log("Base de datos cargada:", db);

    // 🔥 Inicializar controller
    noteController.init();
    setupNotesPanelToggle();

}

initApp();