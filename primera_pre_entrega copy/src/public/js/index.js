const socket = io()
// socket.emit('message', "Mensaje desde index")

socket.on("products", data=>{
    // console.log(data);
    let divProducts = document.getElementById('products')
    console.log(divProducts);
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // console.log(element.title);
        let div = document.createElement('div')
        div.innerHTML = `<p>${element.title}</p>
                        <p>${element.price}</p>`
        divProducts.appendChild(div)        
    }
})