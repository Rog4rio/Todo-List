'use strict'

// let banco = [ //Array de objetos para simular um banco de dados.
//     {'tarefa' : 'Estudar JS', 'status' : ''},
//     {'tarefa' : 'netflix', 'status' : 'checked'},
//     {'tarefa' : 'teste', 'status' : 'checked'}                            
// ];

// let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; // Função que vai no banco e retorna o que tem lá.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div> 
        <input type="button" value="X" data-indice = ${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild) { //Enquanto existir o primeiro filho, excluir o último filho.
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice)); // Varrer o banco de dados. Pegar um item e enviar para o criaItem e pegar somente a tarefa do banco.
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa' : texto, 'status' : ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice,1); // para recortar ou modificar um array.
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
