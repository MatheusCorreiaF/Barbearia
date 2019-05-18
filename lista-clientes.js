// You can also require other files to run in this process
//require('./renderer.js')
var read = require('read-file-utf8')
var loki = require('lokijs');// instanciando o Banco de dados
var db = new loki('db.json');//Criando o banco de dados 
var data = read(__dirname + '/db.json');
db.loadJSON(data);
//console.log(db);

window.Vue = require('vue');

var clientes = db.getCollection('clientes');
if (!clientes) {
    clientes = db.addCollection('clientes');
}

new Vue({
    el: 'body',/*onde iremos trabalhar com o Vue*/
    data: {/*local para declarar variáveis*/
        clientes: [],/*array para receber clientes do banco de dados*/
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
        openModal: false
    },
    ready: function ()/*função executada assim que carrega página*/
    {
        this.clientes = clientes.data;/*carregando lista de clientes do banco de dados*/
        console.log(this.clientes);
    },
    methods:/*local para declarar métodos*/
    {
        abrirModalEditarCliente: function (clienteEditing)
        {
            this.openModal = true;
            this.cliente = clienteEditing;/*Objeto default recebe infos do Cliente a ser editado*/
        },

        salvarEdicaoCliente: function ()
        {
            clientes.update(this.cliente);
            db.save();
            this.openModal = false;
        },
        excluirCliente: function (clienteRemoving)
        {
            clientes.remove(clienteRemoving);
            db.save();
        }
    },
})