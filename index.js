const express = require('express');
const app = express();
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

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

app.get('/todas-perguntas', (re, res)=>{
    title = 'Todas as perguntas';

    Pergunta.findAll({ raw: true, order:[['id', 'DESC']]}).then(perguntas =>{
        res.render('todas-perguntas', {title: title, perguntas: perguntas})
    })
})

app.get('/pergunta/:id', (req, res) => {

    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then((pergunta)=>{
        if(pergunta){
            title = pergunta.titulo;
            Resposta.findAll({
                where: {perguntaID: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {title: title, pergunta: pergunta, respostas: respostas});
            })

        } else{
            title = 'Erro encontrado';
            res.render('errors', {title: title});
        }
    })

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
        res.render('success-response', {title: title})
    })
})

app.post('/salvar-resposta', (req, res) =>{
    let corpo = req.body.corpo;
    let perguntaID = req.body.perguntaID;
    let autor_resposta;
    if (req.body.autor_resposta) autor_resposta = req.body.autor_resposta;
    else autor_resposta = 'Anônimo';

    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID,
        autor_resposta: autor_resposta
    }).then(() =>{
        title = 'Resposta salva com sucesso!'
        res.render('success-response', {title: title})
    })
})

app.listen(8181, ()=>{console.log('App rodando na porta 8181.');})