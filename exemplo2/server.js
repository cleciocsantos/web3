const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const app = express();

const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public',"formulario.html"));
});

app.get('/paginainicial', (req, res) => {
    res.sendFile(path.join(__dirname,'public',"blabla.html"));
});

app.listen(PORT, () => {
    console.log("Servidor iniciado na porta " + PORT);
})