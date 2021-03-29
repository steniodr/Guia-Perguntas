const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');

//Configurações de uso
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded ({ extended: false }))
app.use(express.json())

//Banco de Dados
connection.authenticate()
    .then(()=>{
        console.log('Conexão ao Banco de Dados efetuada com sucesso!')
    })
    .catch((err) => {
        console.log('Erro encontrado: ' + err);
    })
//Rotas
var title;
app.get('/', (req, res) => {
    title = 'Any Quest!ons?';
    res.render('index', {title: title})
});

app.get('/perguntar', (req, res) =>{
    title = 'Faça sua pergunta';
    res.render('perguntar', {title: title});
})

app.post('/salvar-pergunta', (req, res) =>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let autor;
    if (req.body.autor) autor = req.body.autor;
    else autor = 'Anônimo';
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
        autor: autor
    }).then(() => {
        title = 'Pergunta salva com sucesso!'
        res.render('salvar-pergunta', {title: title})
    })
})

app.listen(8181, ()=>{console.log('App rodando na porta 8181.');})