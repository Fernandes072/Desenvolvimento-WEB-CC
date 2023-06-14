//lembrar de fazer upload do nome do arquivo no banco de dados
//aqui estão as modificações para salvar o nome do arquivo no banco de dados
//lembrar de colocar name no input do arquivo

const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

app.use(express.urlencoded({ extended: true }));

app.post('/enviar-dados', upload.single('arquivo'), function(req, res) {
    const nome = req.body.nome;
    const matricula = req.body.matricula;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const curso = req.body.curso;
    const turma = req.body.turma;
    const msg = req.body.msg;
    const arquivo = req.file;

    const sql = "INSERT INTO dados (nome, matricula, cpf, email, telefone, curso, turma, informacoes, arquivo) VALUES (?,?,?,?,?,?,?,?,?)";
    connection.query(sql, [nome, matricula, cpf, email, telefone, curso, turma, msg, arquivo.filename], function(err, result) {
        if (err) throw err;
        console.log('Dados inseridos com sucesso!');
        res.send('Dados inseridos com sucesso!');
    });
});

app.listen(8080, function() {
    console.log('Servidor rodando na porta 8080');
});