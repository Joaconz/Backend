import express, { json, urlencoded } from "express";

const app = express();
const PORT = 8080

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando en el puerto ${PORT}`);
});

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send("Hola Docker")
})

app.get('/opSencilla', (req, res)=>{
    let sum = 0
    for (let index = 0; index < 100000; index++) {
        sum+=index
    }
    res.send({status: "success", sum})
})

app.get('/opCompleja', (req, res)=>{
    let sum = 0
    for (let index = 0; index < 5e9; index++) {
        sum+=index
    }
    res.send({status: "success", sum})
})
