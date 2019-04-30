// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var loki = require('lokijs');// instanciando o Banco de dados
var db = new loki('db.json');//Criando o banco de dados
var clientes = db.getCollection('clientes');
if (!clientes)
{
    console.log('Tabela criada');
    clientes = db.addCollection('clientes');
}else
    {
        console.log("Tabela existe");
    }
clientes.insert([{
    nome: 'Matheus Correia',
    cpf: '123456789-10',
    telefone: '64999832163',
    endereco: 'Rua 06 Qd03 Lt23',
    numero: '23',
    bairro: 'Hene Saud',
    cidade: 'Pires do Rio',
    estado: 'GO'
    },{
        nome: 'Ivna Corrêa',
        cpf: '123456789-10',
        telefone: '64998877665',
        endereco: 'Rua Agusto M. de Godoy',
        numero: '23',
        bairro: 'Bairro Colegial',
        cidade: 'Pires do Rio',
        estado: 'GO'
        }]
    );
db.save();
function ready(fn) {
    if (document.readyState != 'loading') {
        console.log("Não carregada")
        fn();
    } else {
        console.log("Carregada")
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function ()/*Será executada qndo a página estiver carregada*/ {
    console.log(">>>>>>>>>>>>Página Carregada<<<<<<<<<<<")
    document.querySelector('#salvar').addEventListener('click', function (e)/*capta o evento de Click do botão e executa a ação*/ {
        e.preventDefault();
        let cliente = {
            nome: document.querySelector('#nome').value,/*capta o dado do Form pelo ID*/
            cpf: document.querySelector('#cpf').value,
            telefone: document.querySelector('#telefone').value,
            endereco: document.querySelector('#endereco').value,
            numero: document.querySelector('#numero').value,
            bairro: document.querySelector('#bairro').value,
            cidade: document.querySelector('#cidade').value,
            estado: document.querySelector('#estado').value
        };
        console.log(cliente);

        clientes.insert(cliente);
        console.log("Inserido");

        db.saveDatabase();
        console.log("Salvo");
    })
})

