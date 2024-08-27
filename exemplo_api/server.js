const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','formulario.html' ));
});

app.post('/send-information', (req, res) => {
    const {nome, email, senha, conf_senha} = req.body;
    // console.log(nome, nome.length, email, senha, conf_senha);
    if(nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1){
        res.status(200).json({
            status: 'failed',
            message: 'Por favor, preencha todos os campos corretamente!',
        });
    }
    else if(senha != conf_senha){
        res.status(200).json({
            status: 'failed',
            message: 'As senhas digitadas não são iguais!',
        });
    }
    else{
        // aqui vai o código para inserir os registros no banco de dados
        res.status(200).json({
            status: 'success',
            message: 'Registro feito com sucesso!',
            campos: req.body
        });
    }
    //res.send(req.body);
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta 8080');
});
