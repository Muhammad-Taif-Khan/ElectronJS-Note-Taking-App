const TextArea = document.querySelector('#file-data');

const openBtn = document.querySelector('#open-btn');
const saveBtn = document.querySelector('#save-btn');


saveBtn.addEventListener('click', async (e)=>{
    window.mainAPI.saveFile(TextArea.value);
})


openBtn.addEventListener('click', async (e)=>{
    window.mainAPI.openFile().then(data =>{
        TextArea.value = data;
    })
})
