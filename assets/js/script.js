/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    fetch(window.location.href + '/api/minimundos', {
        method: 'get',
    }).then((response) => response.json()).then((data) => {
        data.minimundos.forEach(item => insertList(item.name, item.type))
    }).catch((error) => {
        console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputType, inputDescription) => {
    const formData = new FormData();
    formData.append('name', inputName);
    formData.append('type', inputType);
    formData.append('description', inputDescription);
    fetch(window.location.href + '/api/minimundo', {
        method: 'post',
        body: formData
    }).then((response) => response.json()).catch((error) => {
        console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement('span');
    span.className = 'icon-lixeira';
    parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName('icon-lixeira');
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm('Você tem certeza?')) {
                div.remove()
                deleteItem(nomeItem)
                alert('Removido!')
            }
        }
    }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
    fetch(window.location.href + '/api/minimundo?nome=' + item, {
        method: 'delete'
    }).then((response) => response.json()).catch((error) => {
        console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
    let inputName = document.getElementById('name').value;
    let inputType = document.getElementById('type').value;
    let inputDescription = document.getElementById('description').value;
    if (inputName === '') {
        alert('Escreva o nome do cliente!');
    } else if (inputType === '') {
        alert('Selecione o typo de cliente!');
    } else if (inputDescription === '') {
        alert('Descreva a solução para seu problema!');
    } else {
        insertList(inputName, inputType)
        postItem(inputName, inputType, inputDescription)
        alert('Item adicionado!')
    }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (name, type) => {
    var item = [name, type], table = document.getElementById('smallworlds'), row = table.insertRow(),
        types = {pj: 'Pessoa Juridica', pf: 'Pessoa Fisica'};
    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = i === 1 ? types[item[i]] : item[i];
    }
    insertButton(row.insertCell(-1))
    emptyItem();
    changeSection('list')
    removeElement()
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar os dados do formulario
  --------------------------------------------------------------------------------------
*/
const emptyItem = () => {
    document.getElementById('name').value = '';
    document.getElementById('type').value = '';
    document.getElementById('description').value = '';
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar a seção a ser apresentada
  --------------------------------------------------------------------------------------
*/
const changeSection = (typeSection) => {
    if (typeSection === 'notList') {
        emptyItem();
        document.getElementById('list').style.display = 'none';
        document.getElementById('notList').style.display = 'block';
    } else {
        document.getElementById('list').style.display = 'block';
        document.getElementById('notList').style.display = 'none';
    }
}