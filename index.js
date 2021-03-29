const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded ({ extended: false }))
app.use(express.json())

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

    res.send(`Formulário recebido!
    Titulo: ${titulo}.
    Descrição: ${descricao}.
    Autor: ${autor}.`)
})

app.listen(8181, ()=>{console.log('App rodando na porta 8181.');})