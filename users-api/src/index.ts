import {app} from './app'
import {AddressInfo} from 'net'
import users from './resources/users.json'
import * as express from "express";
import {db} from './db'

// Middleware
app.use(express.json())

app.get('/users', (req,res) => {
    db.query("select * from user;", function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
    //res.status(200).json(users);
})

app.get('/users/:id', (req,res) => {
    db.query("select * from user where id="+parseInt(req.params.id)+";", function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
    /*const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.status(200).json(user)*/
})

app.post('/users', (req,res) => {
    db.query("insert into user (id,name,email) values ('"+req.body.id+"','"+req.body.name+"','"+req.body.email+"');", function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
    /*users.push(req.body)
    console.log(users)
    res.status(200).json(users)*/
})

/*app.get('/users/:idUser/playlist', (req,res) => {
    const idUser = parseInt(req.params.idUser)
    const user = users.find(user => user.id === idUser)
    res.status(200).json(user.playlists)
})

app.put('/users/:idUser/playlist', (req,res) => {
    const idUser = parseInt(req.params.idUser)
    const user = users.find(user => user.id === idUser)
    user.playlists = req.body;
    res.status(200).json(user.playlists)
})

app.get('/users/:idUser/suggestion', (req,res) => {
    const idUser = parseInt(req.params.idUser)
    const user = users.find(user => user.id === idUser)
    res.status(200).json(user.suggestions)
})

app.put('/users/:idUser/suggestion', (req,res) => {
    const idUser = parseInt(req.params.idUser)
    const user = users.find(user => user.id === idUser)
    user.suggestions = req.body;
    res.status(200).json(user.suggestions)
})*/

const server = app.listen(5000, '0.0.0.0', () => {
    db.connect(function(err: any){
      if (err){
        throw err;
      } else {
        console.log("Connecté à la base de données MySQL!");  
        const {port, address} = server.address() as AddressInfo;
        console.log('Server listening on:','http://' + address + ':'+port);
      }
    })
});
 