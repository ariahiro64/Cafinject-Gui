const { remote, ipcRenderer } = require('electron')

function sendToMainProcess(event) {
    ipcRenderer.send("postEvent", event);
}

function openDialogWad() {
    let file = remote.dialog.showOpenDialog({
        "title": '',
        "properties": [`openFile`],
        "filters":
            [
                {
                    "name": "all",
                    "extensions": ["wad"]
                }
            ],
    });
    document.getElementById("input.wad.path").textContent = file;
    document.getElementById("input.wad.path").value = file;
    return file;
}

function openDialogz64() {
    let file = remote.dialog.showOpenDialog({
        "title": '',
        "properties": [`openFile`],
        "filters":
            [
                {
                    "name": "all",
                    "extensions": ["z64"]
                }
            ],
    });
    document.getElementById("input.rom.path").textContent = file;
    document.getElementById("input.rom.path").value = file;
    return file;
}

function openDialogWad_out() {
    let file = remote.dialog.showOpenDialog({
        "title": '',
        "properties": [`promptToCreate`],
        "filters":
            [
                {
                    "name": "all",
                    "extensions": ["wad"]
                }
            ],
    });
    document.getElementById("output.wad.path").textContent = file;
    document.getElementById("output.wad.path").value = file;
    return file;
}
module.exports = { send: sendToMainProcess, wad: openDialogWad, z64: openDialogz64, owad: openDialogWad_out};