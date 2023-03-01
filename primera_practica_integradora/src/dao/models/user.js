import { Schema, model } from 'mongoose'

const userCollection = 'users'
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const UserModel = model(userCollection, UserSchema)

export default UserModel