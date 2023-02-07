const socket = io()
// socket.emit('message', "Mensaje desde index")

socket.on("products", data=>{
    let divProducts = document.getElementById('products')
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let div = document.createElement('div')
        div.innerHTML = `<p>${element.title}</p>
                        <p>${element.price}</p>`
        divProducts.appendChild(div)        
    }
})

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    socket.emit("product",formProps);
  });
