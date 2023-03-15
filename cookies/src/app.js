import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import dbConnection from "./config/connectionDB.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import auth from "./middleware/auth.js";

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

dbConnection()

app.use(useRouter)
app.use(cookieParser("h0l3mund0"))

app.get('/login', (req, res)=> {
  const {username, password} = req.query
  if(username !== 'pepe' || password !== 'pepepass'){
    return res.send('login failed')
  }
  req.session.user = username
  req.session.admin = true
  res.send('login success!')
})

app.get('/private', auth, (req, res)=> {
  res.send('si estas viendo esto es porq estas logueado')
})

app.get('/logout', (req, res)=> {
  req.session.destroy(err=> {
    if (err) {
      return res.json({status: 'Logout Error', body: err})
    }
    res.send('Logout OK!')
  })
})

app.use(session({
  store: MongoStore.create({
    mongoUrl: '',
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl:15
  }),
  secret: "ola123",
  resave: false,
  saveUninitialized: false
}))