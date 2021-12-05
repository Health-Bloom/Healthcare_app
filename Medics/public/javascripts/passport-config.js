const localStrategy=require('passport-local').Strategy

function initialize(passport){
    const autheticateUser=(email,password,done)=>{
        const user=getUserByEmail(email)
        if(user==null){
            return done(null,false,{message:'No User with that E-mail!'})
        }
    }
passport.use(new localStrategy({
    usernameField:'email'}),autheticateUser)
    passport.serialiseUser((user,done)=>{ })
    passport.deserialiseUser((id,done)=>{ })
}
