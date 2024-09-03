const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs");
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','formulario.html' ));
});

app.post('/registra-usuario', (req, res) => {
    const {nome, email, senha, conf_senha} = req.body;
    // Aqui começa a validação dos campos do formulário
    let erro = "";
    if(nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1){
        erro += 'Por favor, preencha todos os campos corretamente!<br>';
    }
    if(senha != conf_senha){
        erro += 'As senhas digitadas não são iguais!<br>';
    }
    if(erro){
        res.status(200).json({
            status: 'failed',
            message: erro,
        });
    }
    else{
        // aqui começa o código para inserir o registro no banco de dados
        let db = new sqlite3.Database('./db/exemplo_tcc.db', (err) => {
            if (err) {
                return console.error(err.message);
            }
                console.log('Conectou no banco de dados!');
        });

        db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
            if(error){
                console.log(error)
            }
            else if(result) {
                db.close((err) => {
                    if (err) {
                    return console.error(err.message);
                    }
                    console.log('Fechou a conexão com o banco de dados.');
                });
                return res.status(200).json({
                    status: 'failed',
                    message: 'Este e-mail já está em uso!',
                });
            } else{
                let senha_criptografada = await bcrypt.hash(senha, 8)

                db.run('INSERT INTO usuario(nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha_criptografada], (error2) => {
                    if(error2) {
                        console.log(error2)
                    } else {
                        db.close((err) => {
                            if (err) {
                            return console.error(err.message);
                            }
                            console.log('Fechou a conexão com o banco de dados.');
                        });
                        return res.status(200).json({
                            status: 'success',
                            message: 'Registro feito com sucesso!',
                            campos: req.body
                        });
                    }
                });
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});