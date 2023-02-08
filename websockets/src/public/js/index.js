const socket = io()

let idDelete = document.getElementById("id")
idDelete.addEventListener('keyup', e=>{
    if (e.key === 'Enter') {
        if (idDelete.value.trim().lenght > 0 || idDelete.value.trim().lenght === undefined) {
            socket.emit('delete', idDelete.value)
            idDelete.value = ''
        }
    }
})

socket.on("getProducts", data=>{
    let divProducts = document.getElementById('products')
    divProducts.innerHTML = ""
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let div = document.createElement('div')
        div.innerHTML = `<p>${element.title}: ${element.price}$</p>`
        divProducts.appendChild(div)        
    }
})

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    socket.emit("newProduct",formProps);
  });
