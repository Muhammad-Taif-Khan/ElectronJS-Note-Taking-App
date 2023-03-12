const {ipcRenderer, contextBridge} = require('electron');


contextBridge.exposeInMainWorld('mainAPI', {

    openFile: async()=>{
       const fileData =  await ipcRenderer.invoke('open-file');
        return fileData;
    },
    saveFile: async (data)=>{
        console.log(data);
      const file = await ipcRenderer.invoke('save-file', data);
      return file;
    }

})