const bcrypt = require('bcrypt')
const User = require('../Model/User')
exports.postLogin = (req,res,next) => {
    if(req.session.user) {
        console.log("user exist");
        res.send({isLoggedIn: true, user: req.session.user , errors: []})
    }
    const {email, password} = req.body
    User.findOne({email: email}).then(user => {
        bcrypt.compare(password, user.password).then(check=> {
            if(check) {
                req.session.user = user
                req.session.save((err) => {
                    if(!err) {
                        console.log("Logged In")
                        res.send({isLoggedIn: true, user: req.session.user})
                    }
                    else console.log("Error on sessions");
                })
            }
            else {
                res.send({isLoggedIn: false, user: undefined, errors: {login: 'wrong username or password'}})
            }
        })
    })
}

exports.postSignUp = (req,res,next) => {
    const {fullname, email, number, password} = req.body
    bcrypt.hash(password, 10).then(result => {
        if(result) {
            const user = new User({
                fullname: fullname,
                email: email,
                number: number,
                password: result
            })
            user.save().then(rs=> {
                if(rs) {
                    res.send({status: 'ok'})
                }
                else res.send({status: 'no'})
            })
        }
    })
}

exports.getSessions = (req,res,next) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    if(req.session.user) {
        res.send({isLoggedIn: true, user: req.session.user})
    }
    else {
        res.send({isLoggedIn: false})
    }
}

exports.logout = (req,res,next) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.send({isLoggedIn: true, status: 'no'})
        }
        else {
            console.log("Logged out");
            res.send({isLoggedIn: false, status: 'ok'})
        }
    })
}