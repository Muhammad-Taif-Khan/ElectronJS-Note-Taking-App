const TextArea = document.querySelector('#file-data');

window.mainAPI.onFileData((data)=>{
    TextArea.value = data;
})
window.mainAPI.onSaveFileData(()=>{
    return TextArea.value;
})