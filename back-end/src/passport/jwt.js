//Configuración Estrategia JWT de Passport
const config = require('config'),
 JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
    passport = require('passport');

const jwtConfig = (app) => { passport.use( new JWTStrategy( {
        secretOrKey: config.get('secret'),
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (error) {
        done(error)
    }
}
))}
module.exports = jwtConfig
