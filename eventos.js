
let imoveis = [];

async function addImovel() {
    event.preventDefault();

    await fetch('http://localhost:8000/imoveis', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: input_nome.value,
            gasto: input_gasto.value,
            lucro: input_lucro.value,
            roi: input_roi.value,
            data: input_data.value,
            foto:input_foto.value
        })
    });


    buscarBebidas();

    //limpar os campos do form
    form_cadastro.reset();

    //vai simular que o usuario ta clicando no x pra fechar o formulario
    //ou seja, dispara um evento de click
    fechar_cadastro.dispatchEvent(new Event('click'));
}

function abrirModal(foto, nome) {
    bodymodal.innerHTML = `<img width="100%" src="${foto}">`;
    exampleModalLabel.innerHTML = nome;
}

function atualizarTabela(lista) {
    document.getElementById("tbody").innerHTML = '';

    lista.map((cada) => {
        document.getElementById('tbody').innerHTML +=
        `
            <tr>
                <td>${cada.nome}</td>
                <td>R$${cada.gasto},00</td>
                <td>R$${cada.lucro},00</td>
                <td>${cada.roi}%</td>
                <td>${cada.data}</td>
                <td><select name="" id="status">
                <option value="viabilidade">Viabilidade</option>
                <option value="documentacao inicio ">Doc. inicio</option>
                <option value="obra">Em obra</option>
                <option value="vendida">Vendida</option>
              </select></td>
                <td>
                    <a onclick="abrirModal('${cada.foto}', '${cada.nome}')" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="${cada.foto}" width="50px">
                    </a>
                </td>
                <td>
                    <a onclick="editarImovel(${cada.id})" href="#cadastro" data-bs-toggle="modal" data-bs-target="#modalEditar" class="btn btn-outline-warning btn-sm">Editar</a>
                    <button onclick="excluirBebida(${cada.id})" class="btn btn-outline-danger btn-sm">Excluir</button>
                </td>
            </tr>
            </tr>
        `;
    });
}

function buscarBebidas() {
    //vamo buscar na API os dados das bebidas
    fetch('http://localhost:8000/imoveis')
        .then(res => res.json())
        .then(dados => {
            imoveis = dados;
            atualizarTabela(dados)
        });
}

buscarBebidas();




async function excluirBebida(id) {

    //vai fazer a requisicao, e vai esperar que ela termine
    await fetch('http://localhost:8000/imoveis/'+id, {
        method: 'DELETE'
    });

    buscarBebidas();
}


function editarImovel(id) {
    form_titulo.innerHTML = "Editar imóvel"

    fetch(`http://localhost:8000/imoveis/${id}`)
        .then(res => res.json())
        .then(dados => {
            //preenchimento do form
            input_nome2.value = dados.nome,
            input_gasto2.value = dados.gasto,
            input_lucro2.value = dados.lucro,
            input_roi2.value = dados.roi,
            input_foto2.value = dados.foto,
            input_data2.value = dados.data
        })
    form_cadastro2.setAttribute('onclick', `salvarBebida(${id})`);
}

//confirmar o editar
async function salvarBebida(id) {
    event.preventDefault();

    await fetch(`http://localhost:8000/imoveis/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: input_nome2.value,
            gasto: input_gasto2.value,
            lucro: input_lucro2.value,
            roi: input_roi2.value,
            foto: input_foto2.value,
            data: input_data2.value,
        })
    });

    fechar_cadastro2.dispatchEvent(new Event('click'));


    buscarBebidas();
} 




            // input_nome.value = dados.nome,
            // input_gasto.value = dados.gasto,
            // input_lucro.value = dados.lucro,
            // input_roi.value = dados.roi,
            // input_data.value = dados.data


            // nome: input_nome.value,
            // gasto: input_gasto.value,
            // lucro: input_lucro.value,
            // roi: input_roi.value,
            // data: input_data.value,