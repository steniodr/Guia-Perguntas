const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

var title;
app.get('/', (req, res) => {
    title = 'Any Quest!ons?';
    res.render('index', {title: title})
});

app.get('/perguntar', (req, res) =>{
    title = 'Faça sua pergunta';
    res.render('perguntar', {title: title});
})

app.listen(8181, ()=>{console.log('App rodando na porta 8181.');})