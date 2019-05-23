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
        /*objeto Cliente com valores default que mantem os dados do cliente antes de decidir se as alterações serão salvas definitivamente*/
        clienteAux: {
            nome: '',
            dataNasc: '',
            cpf: '',
            telefone: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
        },
        edita: true,
        exibeModalExcluirCliente: false,
        exibeModalEditarCliente: false
    },
    ready: function ()/*função executada assim que carrega página*/
    {
        this.clientes = clientes.data;/*carregando lista de clientes do banco de dados*/
        console.log(this.clientes);
    },
    methods:/*local para declarar métodos*/
    {
        salvarEdicaoCliente: function ()/*Uma vez aberto e liberado os campos do modal de edição, esse método salvará as alterções*/
        {
            this.edita = !this.edita;
            clientes.update(this.cliente);
            db.save();
        },
        
        cancelarEdicaoCliente: function ()/*cancela a edição e volta aos valores que estavam*/
        {
            this.cliente.nome = this.clienteAux.nome,
            this.cliente.dataNasc = this.clienteAux.dataNasc,
            this.cliente.cpf = this.clienteAux.cpf,
            this.cliente.telefone = this.clienteAux.telefone,
            this.cliente.endereco = this.clienteAux.endereco,
            this.cliente.numero = this.clienteAux.numero,
            this.cliente.bairro = this.clienteAux.bairro,
            this.cliente.cidade = this.clienteAux.cidade,
            this.cliente.estado = this.clienteAux.estado
            this.edita = !this.edita;
        },
        /*habilita o modal a ser editado e cria uma cópia de segurança dos dados até que realmente sejam salvas as alterações */
        editarCliente: function()
        {
            this.edita = !this.edita;
            this.clienteAux.nome = this.cliente.nome,
            this.clienteAux.dataNasc = this.cliente.dataNasc,
            this.clienteAux.cpf = this.cliente.cpf,
            this.clienteAux.telefone = this.cliente.telefone,
            this.clienteAux.endereco = this.cliente.endereco,
            this.clienteAux.numero = this.cliente.numero,
            this.clienteAux.bairro = this.cliente.bairro,
            this.clienteAux.cidade = this.cliente.cidade,
            this.clienteAux.estado = this.cliente.estado
        },
        
        abrirModalExcluirCliente: function (clienteEditing)
        {
            this.exibeModalExcluirCliente = true;
            this.cliente = clienteEditing;/*Objeto default recebe infos do Cliente a ser editado*/
        },
        
        excluirCliente: function ()
        {
                clientes.remove(this.cliente);
                db.save();
        }
    },
})