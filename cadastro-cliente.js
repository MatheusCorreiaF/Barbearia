// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var read = require('read-file-utf8')
var loki = require('lokijs');// instanciando o Banco de dados
var db = new loki('db.json');//Criando o banco de dados 
var data = read(__dirname + '/db.json');
db.loadJSON(data);

var clientes = db.getCollection('clientes');
if (!clientes) {
    console.log('Tabela criada');
    clientes = db.addCollection('clientes');

    clientes.insert([{
        nome: 'Andrea Pirlo',
        dataNasc: '1981-10-17',
        cpf: '123456789-10',
        telefone: '64999531673',
        endereco: 'Rua 06 Qd13 Lt23',
        numero: '23',
        bairro: 'Nadin Saud',
        cidade: 'Pires do Rio',
        estado: 'GO'
    }, {
        nome: 'Karin Benzema',
        dataNasc: '1984-05-27',
        cpf: '123456789-10',
        telefone: '64998877665',
        endereco: 'Rua Rui Barbosa',
        numero: '23',
        bairro: 'Bairro Cramberry',
        cidade: 'Pires do Rio',
        estado: 'GO'
    }]
    );
    db.save();

} else {
    console.log("Tabela existe");
}

function ready(fn) {
    if (document.readyState != 'loading') {
        console.log("Não carregada")
        fn();
    } else {
        console.log("Carregada")
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// ready(function ()/*Será executada qndo a página estiver carregada*/ {
//     console.log(">>>>>>>>>>>>Página Carregada<<<<<<<<<<<")
//     document.querySelector('#salvar').addEventListener('click', function (e)/*capta o evento de Click do botão e executa a ação*/ {
//         e.preventDefault();
//         let cliente = {
//             nome: document.querySelector('#nome').value,/*capta o dado do Form pelo ID*/
//             cpf: document.querySelector('#cpf').value,
//             telefone: document.querySelector('#telefone').value,
//             endereco: document.querySelector('#endereco').value,
//             numero: document.querySelector('#numero').value,
//             bairro: document.querySelector('#bairro').value,
//             cidade: document.querySelector('#cidade').value,
//             estado: document.querySelector('#estado').value
//         };
//         if (cliente.nome == '') {
//             alert("Informe o Nome");
//         }
//         else {
//             console.log(cliente);

//             clientes.insert(cliente);
//             console.log("Inserido");

//             db.save();
//             console.log("Salvo");
//         }
//     })
// })

window.Vue = require('vue');
new Vue({
    el: 'body',
    data: {
        cliente: {/*objeto Cliente com valores default*/
            nome: '',
            dataNasc: '',
            cpf: '',
            telefone: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
        exibeModalClienteVazio: false,
        exibeModalClienteSalvo: false

    },
    methods:
    {
        salvarCliente: function () {
            var cli = {/*objeto Cliente com valores default*/
                nome: this.cliente.nome,
                dataNasc: this.cliente.dataNasc,
                cpf: this.cliente.cpf,
                telefone: this.cliente.telefone,
                endereco: this.cliente.endereco,
                numero: this.cliente.numero,
                bairro: this.cliente.bairro,
                cidade: this.cliente.cidade,
                estado: this.cliente.estado
            }
            if (cli.nome == '') {
                this.exibeModalClienteSalvo = false;
                this.exibeModalClienteVazio = true;
            }
            else {
                console.log(cli)
                this.exibeModalClienteVazio = false;
                clientes.insert(cli);
                db.save();
                document.getElementById("formCadastrarCliente").reset();
                this.exibeModalClienteSalvo = true;
        }
    }
},
})

