document.getElementById("btnSalvar").addEventListener("click", function () {
    const nome = document.getElementById("nomeTarefa").value;
    const descricao = document.getElementById("descricaoTarefa").value;

    if (!nome) {
        alert("Informe o nome da tarefa");
        return;
    }

    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    const novoId = gerarProximoId(tarefas);

    const tarefa = {
        id: novoId,
        nome: nome,
        descricao: descricao,
        status: "Em Andamento"
    };

    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    adicionarNaLista(tarefa);

    document.getElementById("nomeTarefa").value = "";
    document.getElementById("descricaoTarefa").value = "";
});

function gerarProximoId(tarefas) {
    if (tarefas.length === 0) return 1;

    const maiorId = Math.max(...tarefas.map(t => t.id));
    return maiorId + 1;
}

function adicionarNaLista(tarefa) {
    const lista = document.getElementById("lista-tarefas");

    const item = document.createElement("div");
    item.className = "card mb-2 p-2";

    item.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <strong>${tarefa.nome}</strong><br>
                <small>Status: <span class="status badge ${(tarefa.status !== "Concluído" ? "text-bg-success" : "text-bg-info")} ">${tarefa.status}</span></small>
            </div>
            ${tarefa.status !== "Concluído" 
                ? `<button class="btn btn-success btn-sm btn-concluir">Concluir</button>` 
                : ""}
        </div>
    `;

    const btn = item.querySelector(".btn-concluir");

    if (btn) {
        btn.addEventListener("click", function () {
            atualizarStatus(tarefa.id);
            item.querySelector(".status").innerText = "Concluído";
            btn.remove();
        });
    }

    lista.appendChild(item);
}