const { app, BrowserWindow, ipcMain } = require('electron')
const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const base_dir = path.dirname(app.getPath("exe"));

if (app.getPath("exe").indexOf("node_modules") === -1) {
    process.chdir(base_dir);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 300, height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('./src/index.html')

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    ipcMain.on('postEvent', (event, arg) => {
        // arg will be whatever you sent from the renderer.
        console.log(arg);
        if (arg.debugrom) {
            let rom = fs.readFileSync(arg["input.rom.path"]);
            let header = Buffer.from("435A4C4501", 'hex')
            header.copy(rom, 0x3B, 0, header.length);
            if (!fs.existsSync("./temp")) {
                fs.mkdirSync("./temp");
            }
            fs.writeFileSync(path.resolve(path.join("./temp/", "temp.z64")), rom);
            arg["input.rom.path"] = path.resolve(path.join("./temp/", "temp.z64"));
        }
        fs.copyFileSync(arg["input.wad.path"], "./in.wad");
        fs.copyFileSync(arg["input.wad.path"], "./out.wad");
        fs.copyFileSync(arg["input.rom.path"], "./rom.z64");
        let arg_array = [];
        arg_array.push("-a");
        arg_array.push("inject");
        arg_array.push("-w");
        arg_array.push("in.wad");
        arg_array.push("-o");
        arg_array.push("out.wad")
        arg_array.push("-m");
        arg_array.push("rom.z64");
        arg_array.push("-i");
        arg_array.push("" + arg["id"] + "");
        arg_array.push("-t");
        arg_array.push("" + arg["home.menu.message"] + "");
        arg_array.push("-r");
        arg_array.push("3")
        arg_array.push("-k")
        arg_array.push("common-key.bin")
        if (arg.raphnet) {
            arg_array.push("--raphnet");
        }
        if (arg.verbose) {
            arg_array.push("--verbose");
        }
        child = spawn("./gzinject/gzinject.exe", ["-a", "genkey"], { stdio: 'pipe' })

        child.stdin.setEncoding('utf-8');
        child.stdout.pipe(process.stdout);
        child.stdin.write("45e\n");
        child.stdin.end();

        setTimeout(function () {
            console.log(spawn.sync("./gzinject/gzinject.exe", arg_array, { stdio: 'pipe' }).stdout.toString());
            console.log("Done.");
            fs.copyFileSync("./out.wad", arg["output.wad.path"]);
        }, 1000);
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.