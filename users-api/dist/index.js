"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const users_json_1 = __importDefault(require("./resources/users.json"));
const express = __importStar(require("express"));
const db_1 = require("./db");
// Middleware
app_1.app.use(express.json());
app_1.app.get('/users', (req, res) => {
    db_1.db.query("select * from user;", function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    });
    //res.status(200).json(users);
});
app_1.app.get('/users/:id', (req, res) => {
    db_1.db.query("select * from user where id=" + parseInt(req.params.id) + ";", function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    });
    /*const id = parseInt(req.params.id)
    const user = users.find(user => user.id === id)
    res.status(200).json(user)*/
});
app_1.app.post('/users', (req, res) => {
    db_1.db.query("insert into user (id,name,email) values ('" + req.body.id + "','" + req.body.name + "','" + req.body.email + "');", function (err, result) {
        if (err)
            throw err;
        res.status(200).json(result);
    });
    /*users.push(req.body)
    console.log(users)
    res.status(200).json(users)*/
});
app_1.app.get('/users/:idUser/playlist', (req, res) => {
    const idUser = parseInt(req.params.idUser);
    const user = users_json_1.default.find(user => user.id === idUser);
    res.status(200).json(user.playlists);
});
app_1.app.put('/users/:idUser/playlist', (req, res) => {
    const idUser = parseInt(req.params.idUser);
    const user = users_json_1.default.find(user => user.id === idUser);
    user.playlists = req.body;
    res.status(200).json(user.playlists);
});
app_1.app.get('/users/:idUser/suggestion', (req, res) => {
    const idUser = parseInt(req.params.idUser);
    const user = users_json_1.default.find(user => user.id === idUser);
    res.status(200).json(user.suggestions);
});
app_1.app.put('/users/:idUser/suggestion', (req, res) => {
    const idUser = parseInt(req.params.idUser);
    const user = users_json_1.default.find(user => user.id === idUser);
    user.suggestions = req.body;
    res.status(200).json(user.suggestions);
});
const server = app_1.app.listen(5000, '0.0.0.0', () => {
    db_1.db.connect(function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log("Connecté à la base de données MySQL!");
            const { port, address } = server.address();
            console.log('Server listening on:', 'http://' + address + ':' + port);
        }
    });
});
//# sourceMappingURL=index.js.map