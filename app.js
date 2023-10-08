const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const mongo_url = "mongodb+srv://vusaltest:2UIG0ykIrPJwyYiX@cluster0.u2kxz.mongodb.net/?retryWrites=true&w=majority"
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./Routes/User')
const storeRoute = require('./Routes/Store')
mongoose.connect(mongo_url, { dbName: 'test'})
.then(()=> console.log('connected'))
.catch(err => {
  if(err) console.log(err);
})

const store = new MongoDbStore({
    uri: mongo_url,
    databaseName: 'test',
    collection: 'sessions'
})
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
  origin: "https://movie-website-app.onrender.com",
  methods: ["GET","POST"],
  credentials: true
}))


app.use(session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: false,
    store: store,
    unset : 'destroy',
}))
app.use(userRoute)
app.use(storeRoute)


app.listen(PORT, err => {console.log(err ? err: "Server is running...");})
