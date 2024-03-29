import passport from "passport";
// import UserModel from '../models/user.js'
import local from "passport-local";
import GithubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils/bycriptPass.js";
import { userService } from "../services/index.js";
import { Strategy, ExtractJwt } from "passport-jwt";

// const {Strategy, ExtractJwt} = require('passport-jwt')

const JWTStrategy = Strategy;
const ExtractJWT = ExtractJwt;

const LocalStrategy = local.Strategy;

let cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies("coderCookieToken");
  }
  return token;
};

function initializePassport() {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.aaaf5f6862926597",
        clientSecret: "5fc63897c7ee96464ec7ebc227f5004424d84fc2",
        callbackURL: "http://localhost:8080/auth/githubcallback",
        scope: "user:email",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile: ", profile);
        try {
          // let user = await UserModel.findOne({email: profile._json.email})
          let user = await userService.getUserByEmail(profile._json.email);
          if (!user) {
            let newUser = {
              first_name: profile.username,
              last_name: profile.username,
              email: profile._json.email,
              password: createHash("passwordDefault"),
            };
            let result = await userService.createUser(newUser);
            // let result= await UserModel.create(newUser)
            console.log("created");
            return done(null, result);
          }

          // return done(null,false,{messages:'User Already exists'})
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true, // acceso a la request (req)
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
          // let user = await UserModel.findOne({email: username})
          let user = await userService.getUserByEmail(username);
          console.log(user);
          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }

          // crea el usuario
          let newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };
          // let result = await UserModel.create(newUser)
          let result = await userService.createUser(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userService.getUserByEmail(username);
          if (!user) {
            console.log("Usuario no encontrado");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.getUser(id);
    done(null, user);
  });

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coderSecret",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
}

export default initializePassport;
