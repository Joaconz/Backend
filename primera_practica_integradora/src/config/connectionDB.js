import { connect } from "mongoose";

const url = 'mongodb+srv://joaquinunez2004:sRxzYDj4eh3yBozU@cluster0.d0wseor.mongodb.net/?retryWrites=true&w=majority/ecommerce'

const dbConnection = async () => {
    try {
        console.log('db conectada');
        return await connect(url)
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbConnection