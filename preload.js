const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('mainAPI', {
    saveFile: async (data)=>{
      const file = await ipcRenderer.invoke('save-file', data);
      return file;
    }, 


    onFileData : async(callback)=>{
      ipcRenderer.on('open-file-data', (e, data)=>{
        callback(data);
      })
    },

    onSaveFileData : async (dataCallback)=>{
      ipcRenderer.on('get-save-file-data', (e)=>{
        ipcRenderer.invoke('file-data', dataCallback())
      })
    }
})