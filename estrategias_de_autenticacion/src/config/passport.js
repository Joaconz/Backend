import passport from 'passport'
import local from 'passport-local'
import UserModel from '../dao/models/user'
import { createHash, isValidPassword } from '../utils/bycriptPass'

const LocalStrategy = local.Strategy

const initPassport = () => {
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true, // acceso a la request (req)
            usernameField: 'email',
        },
        async (req, username, password, done) => {
            const {first_name, last_name, email} = req.body
            try {
                // verifica si el usuario ya existe
                let user = await UserModel.findOne({email: username})
                console.log(user)
                if (user) {
                    console.log('El usuario ya existe')
                    return done(null, false)
                }

                // crea el usuario
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password)
                }
                let result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error al obrener el usuario'+error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await UserModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try {
            const user= await UserModel.findOne({email: username})
            if (!user) {
                console.log('Usuario no encontrado')
                return done(null, false)
            }

            if (!isValidPassword(user, password)) return done(null, false)

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}

export default initPassport