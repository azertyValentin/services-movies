import {app} from './app'
import {AddressInfo} from 'net'
import {db} from './db'
import express from 'express';
import * as bodyParser from 'body-parser';

// Middleware
app.use(express.json())

app.get('/movies', (req,res) => {
    db.query("select * from movie;", function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
})

app.get('/movies/:id', (req,res) => {
    db.query("select * from movie where id="+parseInt(req.params.id)+";", function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
})

app.post('/movies', (req,res) => {
    db.query("insert into movie (id,name,realisator,creation) values ('"+req.body.id+"','"+req.body.name+"','"+req.body.realisator+"','"+req.body.creation+"');", function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
    });
})

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
 
