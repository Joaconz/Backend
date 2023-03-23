import passport from 'passport'
import UserModel from '../dao/models/user.js'
import GithubStrategy from 'passport-github2'

function initializePassport(){
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.aaaf5f6862926597',
        clientSecret: '5fc63897c7ee96464ec7ebc227f5004424d84fc2',
        callbackURL: 'http://localhost:8080/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('Profile: ',profile)
        try {
            let user = await UserModel.findOne({email: profile._json.email})
            console.log(user);
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username, 
                    email: 'joaco@gmail.com',
                    password: 'joaco123',
                }
                let result= await UserModel.create(newUser)
                return done(null, result)
            }
            
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport