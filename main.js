// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow , ipcMain, dialog} = require('electron')
const path = require('path')
const fs = require('fs');
let mainWindow;
const createWindow = () => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}


ipcMain.handle('open-file', async (event)=>{
    const filePath = await dialog.showOpenDialog(mainWindow, {
        title:"Open File",
        defaultPath:"C:\\Users\\DELL Latitude 7420\\Desktop\\electron-desktop-app",
        filters:[
            {
               name:"Text Files",
               extensions:['txt']
            }
        ],
        properties:[
            'openFile'
        ]
    });
    
    try{

        const fileData = await new Promise((res, rej)=>{
            fs.readFile(filePath.filePaths[0],{
                encoding:'utf8'
            },
                 (err, data)=>{
                if(err){
                    rej(err)
                }
                res(data)
            }
            )}
         )

         return fileData;
    }
    catch(err){
        throw err;
    }

    
});

ipcMain.handle('save-file', async(event, data)=>{
    
    const filePath = await dialog.showSaveDialog(mainWindow, {
        title:"Save File",
        defaultPath:"new text file.txt",
        
        filters:[
            {
               name:"Text Files",
               extensions:['txt']
            }
        ],
        properties:[
            'showOverwriteConfirmation',
            'createDirectory'
        ]
    });

        fs.writeFile(filePath.filePath, data, (err)=>{
            if (err){
                throw err
            }
        });

});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.