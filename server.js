const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
 
const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '4815162342',
      database: 'smartbrain',
    },
  });

 
const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, resp)=> {
    resp.send(dataBase.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})


app.post("/register", (req, resp) => { register.handleRegister(req, resp, db, bcrypt)})

app.get("/profile/:id", (req, resp) => {profile.handleProfile(req, resp, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)})

app.listen(3000, ()=> {
    console.log("running on port 3000");
});