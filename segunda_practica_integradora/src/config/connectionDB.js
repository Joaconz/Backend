import { connect } from "mongoose";
import session from 'express-session'
import MongoStore from 'connect-mongo'

// const url = 'mongodb+srv://joaquinunez2004:sRxzYDj4eh3yBozU@cluster0.d0wseor.mongodb.net/?retryWrites=true&w=majority/ecommerce'
const url = 'mongodb://localhost:27017/ecommerce'

let configObject = {
    dbConnection: async () => {
        try {
            console.log('db conectada');
            return await connect(url)
        } catch (error) {
            console.log(error);
            process.exit()
        }
    },
    session: {
        store: MongoStore.create({
          mongoUrl: url,
          mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
          ttl:150
        }),
        secret: "s3cr3t123",
        resave: false,
        saveUninitialized: false,
        maxAge: 15000000
      }

}

export default configObject