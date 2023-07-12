const url = "http://localhost:8080/api"

function addToCart(comp) {
    let id = comp.id
    console.log(id);
    axios({
        method: 'post',
        url: `${url}/${id}`,
        data: {
            id
        }
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}
