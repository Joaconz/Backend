import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import dbConnection from "./config/connectionDB.js";
// import UserModel from "./dao/models/user.js";
import ProductModel from "./dao/models/product.js";
// import home from "./routes/home.js";
// import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando en el puerto ${PORT}`);
});

// const socketServer = new Server(httpServer);

dbConnection()

// app.use("/home", home);
// app.get('/realTimeProducts', (req, res)=>{
//     res.render('realTimeProducts')
// })

// socketServer.on("connection", async (socket) => {
//   console.log("Nuevo cliente conectado");
//   let products = await productManager.getProducts();

//   socket.on("newProduct", async (data) => {
//     const { title, description, code, price, stock, category, thumbnail } =
//       data;
//     if (!title || !description || !code || !price || !stock || !category) {
//       console.log("Completar");
//     } else {
//       productManager.addProducts(
//         title,
//         description,
//         price,
//         thumbnail,
//         code,
//         stock,
//         category
//       );
//     }
//     socket.emit("getProducts", products);
//   });

//   socket.on("delete", async (data) => {
//     if (data !== undefined) {
//       productManager.deleteProduct(parseInt(data));
//     }
//   });

//   socket.emit("getProducts", products);
// });


//

app.use(useRouter)

app.get('/mongo',async (req, res)=>{
  try {
    let products = await ProductModel.find({})
    console.log(products);
    res.status(200).send({
      products
    })
  } catch (error) {
    res.status(200).send({error})
  }
})